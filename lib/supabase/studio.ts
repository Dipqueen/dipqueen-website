import { supabase } from "./client";

export type Categorie = {
  id: string;
  slug: string;
  naam: string;
  volgorde: number;
};

export type Product = {
  id: string;
  category_id: string;
  slug: string;
  naam: string;
  volgorde: number;
};

export type Patroon = {
  id: string;
  slug: string;
  naam: string;
  volgorde: number;
};

export async function getCategories(): Promise<Categorie[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, naam, volgorde")
    .eq("actief", true)
    .order("volgorde");
  if (error) throw error;
  return data ?? [];
}

export async function getCategorie(slug: string): Promise<Categorie | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, naam, volgorde")
    .eq("slug", slug)
    .eq("actief", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getProducten(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, category_id, slug, naam, volgorde")
    .eq("category_id", categoryId)
    .eq("actief", true)
    .order("volgorde");
  if (error) throw error;
  return data ?? [];
}

export async function getProduct(categoryId: string, slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, category_id, slug, naam, volgorde")
    .eq("category_id", categoryId)
    .eq("slug", slug)
    .eq("actief", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPatronenVoorProduct(productId: string): Promise<Patroon[]> {
  const { data, error } = await supabase
    .from("product_pattern_mockups")
    .select("patterns ( id, slug, naam, volgorde )")
    .eq("product_id", productId)
    .order("volgorde");
  if (error) throw error;
  const patronen = (data ?? [])
    .map((row: any) => row.patterns as Patroon | null)
    .filter((p: Patroon | null): p is Patroon => !!p)
    .sort((a, b) => a.volgorde - b.volgorde);
  // dubbele patronen eruit halen (kan voorkomen als er meerdere mockup-rijen per combinatie zijn)
  const gezien = new Set<string>();
  return patronen.filter((p) => (gezien.has(p.id) ? false : (gezien.add(p.id), true)));
}

export async function getPatroon(slug: string): Promise<Patroon | null> {
  const { data, error } = await supabase
    .from("patterns")
    .select("id, slug, naam, volgorde")
    .eq("slug", slug)
    .eq("actief", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

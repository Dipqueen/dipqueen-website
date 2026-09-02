import { supabase } from "./client";

export type NieuweAanvraag = {
  naam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
  categorySlug: string | null;
  omschrijving: string;
  aantalRange: string;
  opmerkingen: string;
  productFoto: File | null;
  inspiratieFoto: File | null;
};

async function uploadBestand(file: File, type: "productfoto" | "inspiratie") {
  const ext = file.name.split(".").pop() || "jpg";
  const pad = `${type}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("idea-uploads").upload(pad, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return { type, url: pad };
}

export async function verstuurAanvraag(data: NieuweAanvraag): Promise<string> {
  const files: { type: string; url: string }[] = [];
  if (data.productFoto) files.push(await uploadBestand(data.productFoto, "productfoto"));
  if (data.inspiratieFoto) files.push(await uploadBestand(data.inspiratieFoto, "inspiratie"));

  const { data: aanvraagnummer, error } = await supabase.rpc("submit_idea_request", {
    p_naam: data.naam,
    p_email: data.email,
    p_telefoon: data.telefoon,
    p_bedrijf: data.bedrijf,
    p_category_slug: data.categorySlug,
    p_omschrijving: data.omschrijving,
    p_aantal_range: data.aantalRange,
    p_opmerkingen: data.opmerkingen,
    p_files: files,
  });
  if (error) throw error;
  return aanvraagnummer as string;
}

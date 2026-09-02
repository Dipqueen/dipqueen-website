import { createClient } from "@supabase/supabase-js";

// Publiceerbare sleutel — bewust zichtbaar in de broncode, net als bij de Portal.
// De beveiliging zit in Row Level Security op de database, niet in het verbergen
// van deze sleutel. Zie: DipQueen Website — Supabase project (projectdocument).
const SUPABASE_URL = "https://xhfnjghjpwccihmcxwdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_PXHxrQyROtSiQx2RIqAAnw_EgoMAEZq";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

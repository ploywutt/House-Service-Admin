import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SAPUABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseSecretKey = import.meta.env.VITE_SAPUABASE_SECRET_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const secretKey = createClient(supabaseUrl, supabaseSecretKey)
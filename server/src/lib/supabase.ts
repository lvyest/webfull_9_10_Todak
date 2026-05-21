import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

/** 공개 클라이언트 (anon key) */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

/** 서버 전용 클라이언트 (service role - RLS bypass) */
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

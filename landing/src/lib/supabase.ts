import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = 'https://fzkapybroyzynuakujuy.supabase.co';
const SUPABASE_PROJECT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a2FweWJyb3l6eW51YWt1anV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxODM5NTEsImV4cCI6MjEwMjc1OTk1MX0.-Xd8dRA2XM7y06-8gYVS_Ek_-12lcGS8FTPlKevDHLU';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  SUPABASE_PROJECT_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  SUPABASE_PROJECT_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

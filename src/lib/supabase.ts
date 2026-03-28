import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jkfiaahztjuvtuvdmklo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dXOjAcspyTAxiy7oGd80dQ_u4v-BYhu';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

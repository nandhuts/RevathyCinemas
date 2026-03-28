import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jkfiaahztjuvtuvdmklo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dXOjAcspyTAxiy7oGd80dQ_u4v-BYhu';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testUpdate() {
  const { data, error } = await supabase
    .from('orders')
    .update({ order_status: 'Preparing' })
    .eq('order_number', 'TEST1234');
  console.log("Update Error:", error);
  console.log("Update Data:", data);
}

testUpdate();

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jkfiaahztjuvtuvdmklo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dXOjAcspyTAxiy7oGd80dQ_u4v-BYhu';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabase() {
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_number: 'TEST1234',
      items: [{name: 'Test Popcorn', qty: 1}],
      total_amount: 100,
      screen: 'Audi-1',
      phone_number: '9999999999',
      payment_status: 'success',
      order_status: 'New'
    }]);

  if (error) {
    console.error("Test insert failed:", error);
  } else {
    console.log("Test insert succeeded:", data);
  }
}

testSupabase();

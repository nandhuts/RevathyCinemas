"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Clock, Flame, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState('');

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      const formatted = data.map((d: any) => ({
        id: d.order_number,
        audi: d.screen,
        time: new Date(d.created_at).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        items: d.items,
        status: d.order_status,
      }));
      setOrders(formatted);
    }
  };

  useEffect(() => {
    fetchOrders();
    const orderInterval = setInterval(fetchOrders, 3000);
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    
    return () => {
        clearInterval(orderInterval);
        clearInterval(clockInterval);
    };
  }, []);

  const setPreparing = async (id: string) => {
    await supabase.from('orders').update({ order_status: 'Preparing' }).eq('order_number', id);
    fetchOrders();
  };

  const setReady = async (id: string) => {
    await supabase.from('orders').update({ order_status: 'Ready' }).eq('order_number', id);
    fetchOrders();
  };

  const activeOrders = orders.filter((o:any) => o.status.toLowerCase() === 'new' || o.status.toLowerCase() === 'preparing');

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[var(--premium-gold)] flex items-center gap-4">
            Kitchen Display <Flame className="text-red-500 animate-pulse" size={40} />
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="text-4xl md:text-6xl font-black font-mono tracking-widest text-white shadow-lg">{currentTime}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeOrders.map((order: any) => (
          <div 
            key={order.id} 
            className={`rounded-2xl border-2 flex flex-col h-full bg-[#111] shadow-2xl transition-all ${order.status.toLowerCase() === 'new' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-orange-500/50'}`}
          >
            <div className={`p-4 flex justify-between items-center border-b-2 ${order.status.toLowerCase() === 'new' ? 'bg-red-500/20 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex flex-col">
                <span className="text-4xl font-black uppercase">{order.id}</span>
                <span className="text-xs font-bold text-gray-400 tracking-widest">{order.audi}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-2 text-xl font-bold bg-black/50 px-3 py-1 rounded-lg font-mono">
                  <Clock size={20} className={order.status.toLowerCase() === 'new' ? 'text-red-500' : 'text-[var(--premium-gold)]'} /> {order.time}
                </span>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-center">
              <ul className="space-y-4">
                {order.items.map((item: any, i: number) => (
                  <li key={i} className="flex gap-4 items-center">
                    <span className="w-12 h-12 bg-[var(--premium-gold)] text-black text-2xl font-black rounded-lg flex items-center justify-center shrink-0">
                      {item.qty}x
                    </span>
                    <span className="text-2xl font-bold leading-tight text-gray-200">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border-t-2 border-white/10 mt-auto">
              {order.status.toLowerCase() === 'new' ? (
                  <button 
                  onClick={() => setPreparing(order.id)}
                  className="w-full py-6 bg-orange-600 hover:bg-orange-500 text-white text-2xl font-black uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-3"
                >
                  <Flame size={32} /> Start Prep
                </button>
              ) : (
                  <button 
                  onClick={() => setReady(order.id)}
                  className="w-full py-6 bg-green-600 hover:bg-green-500 text-white text-2xl font-black uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3"
                >
                  <CheckCircle size={32} /> Ready
                </button>
              )}
            </div>
          </div>
        ))}

        {activeOrders.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-gray-600">
            <CheckCircle size={80} className="mb-6 opacity-20" />
            <h2 className="text-4xl font-black uppercase tracking-widest">No Active Orders</h2>
            <p className="text-xl mt-2 font-bold uppercase tracking-wider">Kitchen is caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

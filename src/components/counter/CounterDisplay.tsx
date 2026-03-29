"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CounterDisplay({ screenName }: { screenName: string }) {
  const [preparing, setPreparing] = useState<any[]>([]);
  const [ready, setReady] = useState<any[]>([]);
  const [lastReadyCount, setLastReadyCount] = useState(0);

  const playBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime); 
      osc.start();
      setTimeout(() => { osc.stop(); ctx.close(); }, 500);
    } catch(e) {}
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('screen', screenName)
      .in('order_status', ['Preparing', 'Ready'])
      .order('created_at', { ascending: false });
    
    if (data) {
      const prep = data.filter(d => d.order_status === 'Preparing');
      const rdy = data.filter(d => d.order_status === 'Ready');
      
      setPreparing(prep);
      setReady(rdy);

      if (rdy.length > lastReadyCount && lastReadyCount !== 0) {
        playBeep(); // Ring when a new order is marked ready!
      }
      setLastReadyCount(rdy.length);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [lastReadyCount, screenName]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans flex flex-col">
      <header className="flex justify-between items-center mb-12 border-b-4 border-[var(--premium-gold)]/30 pb-6">
        <div>
          <h1 className="text-4xl md:text-7xl font-black uppercase text-[var(--premium-gold)] tracking-widest font-[var(--font-cinematic)]">
            ORDER STATUS
          </h1>
          <p className="text-2xl mt-4 text-gray-400 font-bold tracking-widest uppercase">{screenName} Counter</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 gap-12 text-center">
        {/* Preparing Column */}
        <div className="border-r-4 border-white/10 pr-12 flex flex-col">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-orange-500 mb-12 pb-6 border-b-2 border-orange-500/20">
            Preparing
          </h2>
          <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-4">
            {preparing.length === 0 ? (
               <p className="text-3xl text-gray-600 font-bold uppercase mt-20">No orders</p>
            ) : (
               preparing.map(o => (
                 <div key={o.order_number} className="text-5xl md:text-7xl font-black text-gray-300 tracking-wider">
                   {o.order_number}
                 </div>
               ))
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div className="pl-6 flex flex-col">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-green-500 mb-12 pb-6 border-b-2 border-green-500/20">
            Ready to Collect
          </h2>
          <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-4">
            {ready.length === 0 ? (
               <p className="text-3xl text-gray-600 font-bold uppercase mt-20">No orders</p>
            ) : (
               ready.map(o => (
                 <div key={o.order_number} className="text-6xl md:text-8xl font-black text-white tracking-wider animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                   {o.order_number}
                 </div>
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

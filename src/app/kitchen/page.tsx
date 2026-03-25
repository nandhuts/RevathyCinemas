"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Clock, Flame, CheckCircle } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'RCX892', time: '14:22', seat: 'G14', items: [{ name: 'Cinemax Classic Popcorn', qty: 2 }, { name: 'Coca Cola Large', qty: 2 }], status: 'pending', priority: true },
  { id: 'RCX893', time: '14:25', seat: 'H10', items: [{ name: 'Cheese Nachos Deluxe', qty: 1 }], status: 'pending', priority: false },
  { id: 'RCX894', time: '14:28', seat: 'B05', items: [{ name: 'Blockbuster Combo', qty: 1 }], status: 'preparing', priority: true },
];

export default function KitchenDashboard() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completeOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-[var(--premium-gold)] flex items-center gap-4">
            Kitchen Display <Flame className="text-red-500 animate-pulse" size={40} />
          </h1>
          <p className="text-gray-400 mt-2 font-bold tracking-wider">Interval Rush: HIGH</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="text-4xl md:text-6xl font-black font-mono tracking-widest text-white shadow-lg">{currentTime}</span>
          <div className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-wider bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
            <RefreshCw size={16} className="animate-spin" /> Auto-sync ON
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order, idx) => (
          <div 
            key={order.id} 
            className={`rounded-2xl border-2 flex flex-col h-full bg-[#111] shadow-2xl transition-all ${order.priority ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/10'}`}
          >
            <div className={`p-4 flex justify-between items-center border-b-2 ${order.priority ? 'bg-red-500/20 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
              <div className="flex flex-col">
                <span className="text-4xl font-black uppercase">{order.seat}</span>
                <span className="text-xs font-bold text-gray-400 tracking-widest">#{order.id}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-2 text-xl font-bold bg-black/50 px-3 py-1 rounded-lg font-mono">
                  <Clock size={20} className={order.priority ? 'text-red-500' : 'text-[var(--premium-gold)]'} /> {order.time}
                </span>
                {order.priority && <span className="text-xs font-black text-red-500 uppercase tracking-widest mt-1 animate-pulse">Interval Priority</span>}
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-center">
              <ul className="space-y-4">
                {order.items.map((item, i) => (
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
              <button 
                onClick={() => completeOrder(order.id)}
                className="w-full py-6 bg-green-600 hover:bg-green-500 text-white text-2xl font-black uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3"
              >
                <CheckCircle size={32} /> Done
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
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

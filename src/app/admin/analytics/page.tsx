"use client";

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Popcorn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('orders').select('*');
      if (data) setOrders(data);
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Compute dynamic stats
  const totalOrders = orders.length;

  let itemCounts: Record<string, number> = {};
  orders.forEach(o => {
    (o.items || []).forEach((item: any) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });
  let mostOrdered = "None";
  let maxCount = 0;
  for (const [name, count] of Object.entries(itemCounts)) {
    if (count > maxCount) { maxCount = count as number; mostOrdered = name; }
  }

  const screens = new Set(orders.map(o => o.screen));
  
  const hours = new Array(24).fill(0);
  orders.forEach(o => {
    const d = new Date(o.created_at);
    hours[d.getHours()]++;
  });
  const maxHourVal = Math.max(...hours, 1);
  const peakHour = hours.indexOf(Math.max(...hours, -1));
  const peakOrders = hours[peakHour] || 0;

  const KPIS = [
    { title: "Total Orders Today", value: totalOrders.toString(), icon: <TrendingUp className="text-[var(--premium-gold)]" size={32} />, trend: "Live Data" },
    { title: "Most Ordered Snack", value: mostOrdered, icon: <Popcorn className="text-[var(--premium-gold)]" size={32} />, sub: `${maxCount} Units` },
    { title: "Active Shows", value: screens.size.toString(), icon: <Users className="text-[var(--premium-gold)]" size={32} />, sub: Array.from(screens).join(', ') || "No active screens" },
    { title: "Peak Interval Orders", value: peakOrders.toString(), icon: <Clock className="text-[var(--premium-gold)]" size={32} />, sub: `At ${peakHour.toString().padStart(2, '0')}:00` },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase text-white tracking-widest">
            Owner <span className="gold-text-gradient">Analytics</span>
          </h1>
          <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-sm">Realtime Theatre Insights</p>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {KPIS.map((kpi, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[var(--premium-gold)]/50 transition-colors group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--premium-gold)]/5 rounded-full blur-[20px] group-hover:bg-[var(--premium-gold)]/20 transition-colors"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">{kpi.title}</h3>
                  <span className="text-3xl font-black text-white">{kpi.value}</span>
                </div>
                {kpi.icon}
              </div>
              <div className="mt-auto">
                <span className={`text-xs font-bold uppercase tracking-widest ${kpi.trend ? 'text-green-500' : 'text-gray-500'}`}>
                  {kpi.trend || kpi.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mock Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative h-96">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <BarChart3 size={20} className="text-[var(--premium-gold)]" /> Order Volume by Hour
              </h3>
              <select className="bg-white/5 border border-white/20 text-white text-xs font-bold uppercase p-2 rounded outline-none">
                <option>Today</option>
                <option>Yesterday</option>
              </select>
            </div>
            
            {/* Real Chart Visualization */}
            <div className="h-48 flex items-end justify-between gap-2 mt-auto">
              {[9, 11, 13, 15, 17, 19, 21, 23].map((h, i) => {
                const heightPercentage = (hours[h] / maxHourVal) * 100 || 5; // give min 5% to show bar structure
                return (
                  <div key={i} className="w-full bg-white/5 hover:bg-[var(--premium-gold)]/80 transition-colors rounded-t-sm relative group flex flex-col justify-end" style={{ height: `${heightPercentage}%` }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 font-mono transition-opacity">{hours[h]}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest border-t border-white/10 pt-4 px-2">
              <span>9 AM</span>
              <span>11 AM</span>
              <span>1 PM</span>
              <span>3 PM</span>
              <span>5 PM</span>
              <span>7 PM</span>
              <span>9 PM</span>
              <span>11 PM</span>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold uppercase tracking-widest text-white gap-2 mb-8 self-start w-full">
              Seat Heatmap
            </h3>
            <div className="w-full relative aspect-square max-w-xs mx-auto flex flex-col justify-center gap-1 opacity-80 scale-95 hover:scale-100 hover:opacity-100 transition-all">
              {/* Abstract Heatmap representation using dots */}
              {[...Array(8)].map((_, row) => (
                <div key={row} className="flex justify-center gap-1">
                  {[...Array(12)].map((_, col) => {
                    // Random intensity for mock
                    const val = Math.random();
                    let color = 'bg-white/5'; // low
                    if (val > 0.8) color = 'bg-red-500'; // very high
                    else if (val > 0.5) color = 'bg-orange-500'; // high
                    else if (val > 0.3) color = 'bg-[var(--premium-gold)]'; // med
                    
                    return <div key={col} className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${color} transition-colors`} />;
                  })}
                </div>
              ))}
              <div className="w-[80%] mx-auto h-2 bg-white/20 rounded-full mt-4 mb-2 flex flex-col justify-center items-center">
                <span className="text-[8px] uppercase font-bold text-gray-500 tracking-[0.3em] font-mono mt-4">Screen</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-sm"></div> High</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[var(--premium-gold)] rounded-sm"></div> Med</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white/5 rounded-sm border border-white/10"></div> Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

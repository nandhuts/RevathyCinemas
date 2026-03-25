"use client";

import { useState } from 'react';
import { Filter, Search, CheckCircle, Clock, Flame, Truck } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'RCX892', time: '14:22', seat: 'G14', audi: 'Audi 1', items: '2x Popcorn, 2x Coke', status: 'pending' },
  { id: 'RCX893', time: '14:25', seat: 'H10', audi: 'Audi 2', items: '1x Nachos', status: 'preparing' },
  { id: 'RCX894', time: '14:28', seat: 'B05', audi: 'Audi 1', items: '1x Blockbuster Combo', status: 'on the way' },
  { id: 'RCX895', time: '14:30', seat: 'J20', audi: 'Audi 3', items: '1x Popcorn', status: 'delivered' },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeFilter);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'preparing': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'on the way': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const statusIcons = {
    pending: <Clock size={16} />,
    preparing: <Flame size={16} />,
    'on the way': <Truck size={16} />,
    delivered: <CheckCircle size={16} />
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase text-white tracking-widest font-[var(--font-cinematic)]">
              Staff <span className="text-[var(--premium-gold)]">Dashboard</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">{orders.filter(o=>o.status !== 'delivered').length} Active Orders</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 w-64 text-white">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Search Seat / Booking ID" className="bg-transparent border-none outline-none w-full text-sm font-bold uppercase tracking-wider placeholder:text-gray-600" />
            </div>
            <button className="bg-white/5 border border-white/10 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-white">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'pending', 'preparing', 'on the way', 'delivered'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-3 rounded-xl border font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap
                ${activeFilter === f ? 'bg-[var(--premium-gold)] text-black border-[var(--premium-gold)] shadow-[0_0_20px_rgba(207,168,94,0.3)]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
            >
              {f} ({f === 'all' ? orders.length : orders.filter(o => o.status === f).length})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto bg-black border border-white/10 rounded-2xl shadow-xl glass-panel">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 uppercase text-xs font-bold tracking-widest text-gray-400">
                <th className="p-6">Order ID</th>
                <th className="p-6">Location</th>
                <th className="p-6">Time</th>
                <th className="p-6 w-1/3">Items</th>
                <th className="p-6 text-center">Current Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-bold font-mono tracking-widest text-white">{order.id}</td>
                  <td className="p-6">
                    <span className="text-xl font-black text-[var(--premium-gold)] uppercase tracking-wider block">{order.seat}</span>
                    <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">{order.audi}</span>
                  </td>
                  <td className="p-6 text-gray-300 font-bold uppercase tracking-widest">{order.time}</td>
                  <td className="p-6 text-sm text-gray-300 font-medium">
                    {order.items}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {statusIcons[order.status as keyof typeof statusIcons]}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === 'pending' && <button onClick={() => updateStatus(order.id, 'preparing')} className="px-4 py-2 bg-orange-600/20 text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">Prep</button>}
                      {order.status === 'preparing' && <button onClick={() => updateStatus(order.id, 'on the way')} className="px-4 py-2 bg-blue-600/20 text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">Dispatch</button>}
                      {order.status === 'on the way' && <button onClick={() => updateStatus(order.id, 'delivered')} className="px-4 py-2 bg-green-600/20 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/30 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">Delivered</button>}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
                    No orders found matching this filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

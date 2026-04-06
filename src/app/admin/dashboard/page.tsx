"use client";

import { useState, useEffect, useRef } from 'react';
import { Filter, Search, CheckCircle, Clock, Flame, Image as ImageIcon, Plus, Trash2, Edit2, Play } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const { menu, updateMenu } = useAppStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  
  // Orders Tab State
  const [activeFilter, setActiveFilter] = useState('all');
  const [lastOrderCount, setLastOrderCount] = useState(0);

  // Menu Tab State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({ name: '', price: '', type: 'Popcorn', desc: '', img: '', enabled: true });

  const playBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch for notification
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // Lower volume
      osc.start();
      setTimeout(() => { osc.stop(); ctx.close(); }, 300);
    } catch(e) {}
  };

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
        phone: d.phone_number
      }));
      
      setOrders(formatted);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Polling for live orders
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for new orders to beep
    if (orders.length > lastOrderCount && lastOrderCount !== 0) {
      const newOrder = orders[0];
      if (newOrder?.status === 'New') {
          playBeep();
      }
    }
    setLastOrderCount(orders.length);
  }, [orders, lastOrderCount]);

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter((o:any) => o.status.toLowerCase() === activeFilter.toLowerCase());

  const updateOrderStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ order_status: newStatus }).eq('order_number', id);
    fetchOrders(); // Immediately refresh local state
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'new': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      case 'preparing': return 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case 'ready': return 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
      case 'completed': return 'bg-gray-800/30 text-gray-500 border-gray-800';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleImageUpload = (e: any, setFunc: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFunc((prev: any) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveMenu = () => {
    if (editingItem) {
      updateMenu(menu.map(m => m.id === editingItem.id ? editingItem : m));
      setEditingItem(null);
    } else {
      updateMenu([...menu, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', price: '', type: 'Popcorn', desc: '', img: '', enabled: true });
    }
  };

  const deleteMenuItem = (id: number) => {
    updateMenu(menu.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase text-white tracking-widest font-[var(--font-cinematic)]">
              Staff <span className="text-[var(--premium-gold)]">Dashboard</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <button 
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-xl border font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'orders' ? 'bg-[var(--premium-gold)] text-black border-[var(--premium-gold)]' : 'bg-transparent text-gray-400 border-white/10'}`}
            >
                Live Orders
            </button>
            <button 
                onClick={() => setActiveTab('menu')}
                className={`px-6 py-3 rounded-xl border font-bold uppercase tracking-widest text-xs transition-colors ${activeTab === 'menu' ? 'bg-[var(--premium-gold)] text-black border-[var(--premium-gold)]' : 'bg-transparent text-gray-400 border-white/10'}`}
            >
                Menu Management
            </button>
          </div>
        </div>

        {activeTab === 'orders' ? (
          <>
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {['all', 'new', 'preparing', 'ready', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-xl border font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap
                    ${activeFilter === f ? 'bg-[var(--premium-gold)] text-black border-[var(--premium-gold)] shadow-[0_0_20px_rgba(207,168,94,0.3)]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                >
                  {f === 'all' ? 'All Orders' : f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order: any) => (
                <div key={order.id} className={`rounded-3xl border-2 flex flex-col h-full bg-[#0a0a0a] transition-all overflow-hidden
                  ${order.status.toLowerCase() === 'new' ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] transform hover:scale-[1.02]' 
                  : order.status.toLowerCase() === 'preparing' ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                  : order.status.toLowerCase() === 'ready' ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                  : 'border-white/5 opacity-60'}`}>
                  
                  {/* Card Header */}
                  <div className={`p-5 flex justify-between items-start border-b border-white/10 
                    ${order.status.toLowerCase() === 'new' ? 'bg-yellow-500/10' : 
                      order.status.toLowerCase() === 'preparing' ? 'bg-blue-500/10' : 
                      order.status.toLowerCase() === 'ready' ? 'bg-green-500/10' : 'bg-white/5'}`}>
                    <div className="flex flex-col">
                      <span className="text-4xl font-black uppercase text-white tracking-widest font-mono drop-shadow-md">{order.id}</span>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg font-black text-white bg-black/40 px-3 py-1 rounded-lg border border-white/10">{order.audi}</span>
                        <span className="text-sm font-bold text-gray-400 bg-black/20 px-2 py-1 rounded">{order.phone}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-black uppercase tracking-widest px-4 py-2 rounded-xl mb-2 border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-bold bg-black/50 px-3 py-1.5 rounded-lg text-gray-300">
                        <Clock size={14} className="text-gray-400" /> {order.time}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <ul className="space-y-4">
                      {order.items.map((item: any, i: number) => (
                        <li key={i} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                          <span className="w-12 h-12 bg-white/10 text-white text-xl font-black rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                            {item.qty}x
                          </span>
                          <span className="text-xl font-bold text-gray-200">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 border-t border-white/10 bg-[#111] grid grid-cols-2 md:grid-cols-4 gap-3 mt-auto">
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'Preparing')} 
                      disabled={order.status.toLowerCase() !== 'new'}
                      className={`col-span-2 md:col-span-2 py-4 font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 text-sm
                        ${order.status.toLowerCase() === 'new' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                    >
                      <Flame size={18} /> Preparing
                    </button>
                    
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'Ready')} 
                      disabled={order.status.toLowerCase() !== 'preparing'}
                      className={`col-span-2 md:col-span-2 py-4 font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 text-sm
                        ${order.status.toLowerCase() === 'preparing' ? 'bg-green-600 hover:bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                    >
                      <CheckCircle size={18} /> Ready
                    </button>

                    <button 
                      onClick={() => updateOrderStatus(order.id, 'Completed')} 
                      disabled={order.status.toLowerCase() !== 'ready'}
                      className={`col-span-4 py-4 font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 text-sm
                        ${order.status.toLowerCase() === 'ready' ? 'bg-white hover:bg-gray-200 text-black shadow-lg' : 'bg-transparent border border-gray-800 text-gray-600'}`}
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 font-bold uppercase tracking-widest">
                  No orders found.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 border border-white/10 rounded-2xl p-6 bg-[#111] h-fit sticky top-24">
                <h2 className="text-xl font-black uppercase text-white tracking-widest mb-6 font-[var(--font-cinematic)] border-b border-white/10 pb-4">
                    {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1 block">Name</label>
                        <input type="text" value={editingItem ? editingItem.name : newItem.name} onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({...newItem, name: e.target.value})} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white" />
                    </div>
                    <div>
                        <label className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1 block">Price (₹)</label>
                        <input type="number" value={editingItem ? editingItem.price : newItem.price} onChange={(e) => editingItem ? setEditingItem({...editingItem, price: Number(e.target.value)}) : setNewItem({...newItem, price: Number(e.target.value)})} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white" />
                    </div>
                    <div>
                        <label className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1 block">Type/Category</label>
                        <select value={editingItem ? editingItem.type : newItem.type} onChange={(e) => editingItem ? setEditingItem({...editingItem, type: e.target.value}) : setNewItem({...newItem, type: e.target.value})} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white appearance-none">
                            <option value="Popcorn">Popcorn</option>
                            <option value="Nachos">Nachos</option>
                            <option value="Burger">Burger</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Combo">Combo</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1 block">Description</label>
                        <textarea value={editingItem ? editingItem.desc : newItem.desc} onChange={(e) => editingItem ? setEditingItem({...editingItem, desc: e.target.value}) : setNewItem({...newItem, desc: e.target.value})} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white h-20" />
                    </div>
                    <div>
                        <label className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1 block">Image</label>
                        <label className="border border-dashed border-white/20 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, editingItem ? setEditingItem : setNewItem)} />
                            <div className="flex flex-col items-center">
                                {(editingItem ? editingItem.img : newItem.img) ? (
                                    <div className="w-20 h-20 bg-cover bg-center rounded" style={{ backgroundImage: `url(${editingItem ? editingItem.img : newItem.img})`}}></div>
                                ) : (
                                    <>
                                        <ImageIcon className="text-gray-500 mb-2" size={24} />
                                        <span className="text-xs text-gray-400 font-bold">Upload Image</span>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    {editingItem && (
                        <label className="flex items-center gap-3 cursor-pointer py-2">
                            <input type="checkbox" checked={editingItem.enabled !== false} onChange={(e) => setEditingItem({...editingItem, enabled: e.target.checked})} className="w-5 h-5 accent-[var(--premium-gold)]" />
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Item Enabled</span>
                        </label>
                    )}

                    <div className="flex gap-2 pt-4">
                        <button onClick={saveMenu} className="flex-1 bg-[var(--premium-gold)] text-black font-bold uppercase tracking-widest p-3 rounded-lg transition-colors hover:bg-white text-sm">
                            {editingItem ? 'Update Item' : 'Add Item'}
                        </button>
                        {editingItem && (
                            <button onClick={() => setEditingItem(null)} className="px-4 border border-white/20 text-white rounded-lg hover:bg-white/10 uppercase font-bold text-xs tracking-widest">Cancel</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {menu.map((item:any) => (
                    <div key={item.id} className={`border rounded-xl p-4 flex gap-4 transition-colors ${item.enabled === false ? 'border-red-500/30 bg-red-500/5 opacity-50' : 'border-white/10 bg-white/5'}`}>
                        <div className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 border border-white/10" style={{ backgroundImage: `url(${item.img})`}}></div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-white mb-1 line-clamp-1">{item.name}</h4>
                                <span className="text-[10px] uppercase font-bold text-gray-400 border border-white/20 px-2 py-0.5 rounded">{item.type}</span>
                                {item.enabled === false && <span className="ml-2 text-[10px] uppercase font-bold text-red-500 border border-red-500/20 px-2 py-0.5 rounded">Disabled</span>}
                            </div>
                            <div className="flex justify-between items-end mt-2">
                                <span className="text-[var(--premium-gold)] font-black">₹{item.price}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingItem(item)} className="p-1.5 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={14}/></button>
                                    <button onClick={() => deleteMenuItem(item.id)} className="p-1.5 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle2, ChevronRight, Smartphone, Ticket, QrCode as QrCodeIcon, ArrowRight, ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export default function OrderFlow() {
  const { menu, orders, updateOrders } = useAppStore();
  const [step, setStep] = useState(1);
  const [screen, setScreen] = useState('');
  const [cart, setCart] = useState<{item: any, qty: number}[]>([]);
  const [customer, setCustomer] = useState({ phone: '', payment: 'upi' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [generatedOrder, setGeneratedOrder] = useState<any>(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const categories = ['All', 'Popcorn', 'Nachos', 'Burger', 'Beverage', 'Combo'];
  const activeMenu = menu.filter((m: any) => m.enabled !== false);
  const filteredMenu = activeCategory === 'All' ? activeMenu : activeMenu.filter((m: any) => m.type === activeCategory);

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.qty), 0);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(c => c.item.id !== id));
  };

  const placeOrder = async () => {
    setIsOrdering(true);
    const orderId = `RC${Math.floor(100 + Math.random() * 900)}`;

    const itemsJson = cart.map(c => ({ name: c.item.name, qty: c.qty }));
    
    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          order_number: orderId,
          items: itemsJson,
          total_amount: cartTotal,
          screen: screen,
          phone_number: customer.phone,
          payment_status: 'success',
          order_status: 'New'
        }]);

      if (error) {
        throw error;
      }

      const newOrderInfo = {
        id: orderId,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        audi: screen,
        items: itemsJson,
        status: 'New'
      };
      
      setGeneratedOrder(newOrderInfo);
      setStep(5);
    } catch (err) {
      alert("Unable to save order please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-[var(--primary-accent)] text-black shadow-[0_0_15px_var(--primary-glow)] scale-110' : 'bg-[#0a0a0a] border border-white/20 text-gray-500'}`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-xl flex justify-between items-center sticky top-20 z-20 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <h2 className="text-xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Snack Menu</h2>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 whitespace-nowrap rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${activeCategory === cat ? 'bg-[var(--primary-accent)] text-black border-[var(--primary-accent)] shadow-[0_0_15px_var(--primary-glow)]' : 'bg-black/80 text-white/70 border-white/10 hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
              {filteredMenu.map((item: any, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id} 
                  className="glass-panel p-3 rounded-2xl flex gap-4 hover:-translate-y-1 transition-transform border border-white/5 hover:border-[var(--primary-accent)]/30 group bg-gradient-to-br from-[#0a0a0a] to-[#151515]"
                >
                  <div className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0 shadow-inner group-hover:shadow-[0_0_15px_var(--primary-glow)] transition-shadow" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-xl font-black text-[var(--primary-accent)] tracking-wider">₹{item.price}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-auto px-5 h-8 rounded-full bg-[var(--primary-accent)] text-[#050505] font-black text-xs flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-[0_0_10px_var(--primary-glow)]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Cart Panel */}
            {cart.length > 0 && (
              <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pt-12">
                <div className="container mx-auto px-0 max-w-2xl">
                  <div className="bg-[#111] border border-[var(--primary-accent)]/40 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex justify-between items-center backdrop-blur-lg">
                    <div className="flex items-center gap-4">
                      <div className={`relative ${cartBounce ? 'scale-125' : 'scale-100'} transition-transform`}>
                        <ShoppingCart className="text-[var(--primary-accent)]" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ff2a2a] rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-[#111]">{cart.reduce((a,c)=>a+c.qty,0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total</span>
                        <span className="text-xl font-black text-[var(--primary-accent)]">₹{cartTotal}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[var(--primary-accent)] hover:bg-white text-[#050505] font-black uppercase tracking-widest text-sm rounded-xl flex items-center gap-2 shadow-[0_0_20px_var(--primary-glow)] transition-all hover:scale-105"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-black transition-colors"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Select Screen</h2>
            </div>

            <div className="grid gap-4 mb-8">
              {['Audi-1', 'Audi-2', 'Audi-3'].map((audi) => (
                <button
                  key={audi}
                  onClick={() => setScreen(audi)}
                  className={`w-full py-6 rounded-xl flex items-center justify-center text-xl font-bold uppercase tracking-widest transition-all ${screen === audi ? 'bg-[var(--primary-accent)] text-black shadow-[0_0_20px_var(--primary-glow)] scale-[1.02]' : 'bg-black/50 border border-white/10 text-white hover:border-[var(--primary-accent)]/50'}`}
                >
                  {audi}
                </button>
              ))}
            </div>
            
            <button 
                onClick={() => setStep(3)}
                disabled={!screen}
                className="w-full py-4 bg-[var(--primary-accent)] disabled:bg-white/5 text-[#050505] disabled:text-gray-500 font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_0_20px_var(--primary-glow)] disabled:shadow-none hover:shadow-[0_0_30px_var(--primary-glow)]"
              >
                Continue <ArrowRight size={18} />
              </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <button onClick={() => setStep(2)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-black transition-colors"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Order Details</h2>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block flex items-center gap-2">
                  <Smartphone size={14} /> Mobile Number
                </label>
                <input 
                  type="tel" 
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value.replace(/\D/g,'').slice(0, 10)})}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[var(--primary-accent)] focus:ring-1 focus:ring-[var(--primary-accent)] transition-all font-bold tracking-wider"
                />
                {customer.phone.length > 0 && customer.phone.length < 10 && <p className="text-[#ff2a2a] text-xs mt-2 font-bold font-mono">Invalid number</p>}
              </div>

              <div className="border border-[var(--primary-accent)]/20 rounded-2xl p-5 bg-[#0a0a0a]/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--primary-accent)] mb-4 flex items-center gap-2"><Ticket size={14}/> Summary</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm font-medium">Screen</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{screen}</span>
                </div>
                <div className="mb-3 border-b border-white/10 pb-4 mt-4">
                  {cart.map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-sm mb-3">
                      <span className="text-gray-300"><span className="text-[var(--primary-accent)] font-bold">{c.qty}x</span> {c.item.name}</span>
                      <span className="text-white font-mono">₹{c.item.price * c.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-white font-black text-lg">Total</span>
                  <span className="text-[var(--primary-accent)] font-black text-2xl drop-shadow-[0_0_10px_var(--primary-glow)]">₹{cartTotal}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)}
              disabled={customer.phone.length !== 10}
              className="w-full py-4 bg-[var(--primary-accent)] text-[#050505] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_var(--primary-glow)] disabled:opacity-50 disabled:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Proceed to Payment
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary-accent)]/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 relative z-10">
              <button onClick={() => setStep(3)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--primary-accent)] hover:text-black transition-colors"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">UPI Payment</h2>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm relative z-10">Scan the QR code below using any UPI app</p>

            <div className="bg-white p-4 rounded-3xl w-64 h-64 mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_var(--primary-glow)] relative z-10 transform hover:scale-105 transition-transform">
                <QrCodeIcon size={200} className="text-black" />
            </div>

            <div className="flex justify-between items-center border border-[var(--primary-accent)]/30 bg-[#050505] rounded-xl p-4 mb-8 max-w-sm mx-auto shadow-inner relative z-10">
                <span className="text-gray-300 font-bold uppercase tracking-wider text-xs">Amount to Pay</span>
                <span className="text-[var(--primary-accent)] font-black text-2xl drop-shadow-[0_0_10px_var(--primary-glow)]">₹{cartTotal}</span>
            </div>

            <button 
              onClick={placeOrder}
              disabled={isOrdering}
              className="w-full max-w-sm mx-auto py-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all disabled:opacity-50 relative z-10 hover:scale-[1.02]"
            >
              {isOrdering ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <CheckCircle2 size={18} />
              )}
              {isOrdering ? 'Processing...' : 'Payment Completed'}
            </button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 glass-panel rounded-3xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--primary-accent)]/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
              className="w-28 h-28 rounded-full bg-[var(--primary-accent)] flex items-center justify-center text-[#050505] mb-8 shadow-[0_0_50px_var(--primary-glow)] relative z-10"
            >
              <CheckCircle2 size={64} strokeWidth={2.5} />
            </motion.div>
            
            <h2 className="text-3xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-2 relative z-10">Order Confirmed</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-6 relative z-10">Please note your order ID</p>

            <div className="text-[var(--primary-accent)] font-black tracking-widest text-5xl mb-6 uppercase border-2 border-[var(--primary-accent)] bg-[#050505]/80 px-10 py-5 rounded-2xl shadow-[0_0_30px_var(--primary-glow)] relative z-10 font-mono">
                {generatedOrder?.id}
            </div>
            
            <div className="bg-[#050505]/80 border border-[var(--primary-accent)]/20 rounded-2xl p-6 mb-8 w-full max-w-sm flex flex-col justify-center items-center text-center relative z-10 backdrop-blur-md">
              <span className="text-gray-500 block uppercase font-bold text-xs mb-3 tracking-widest">Collect From</span>
              <span className="text-xl font-bold text-white uppercase tracking-wider px-6 py-2 bg-white/5 rounded-xl mb-4 border border-white/5 block w-full">Snack Counter</span>
              
              <div className="w-full h-px bg-white/10 mb-4"></div>

              <span className="text-gray-500 block uppercase font-bold text-xs mb-2 tracking-widest">Estimated Pickup Time</span>
              <span className="text-lg font-black text-green-400 uppercase tracking-widest">5 to 10 Minutes</span>
              <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">Screen: {screen}</span>
            </div>

            <button onClick={() => window.location.href='/'} className="px-8 py-4 bg-white hover:bg-[var(--primary-accent)] text-black rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_var(--primary-glow)] relative z-10 hover:scale-[1.02]">
              Back to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle2, ChevronRight, Smartphone, Ticket, QrCode as QrCodeIcon, ArrowRight } from 'lucide-react';
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-[var(--premium-gold)] text-black shadow-[0_0_15px_rgba(207,168,94,0.5)]' : 'bg-black border border-white/20 text-gray-500'}`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-xl flex justify-between items-center sticky top-20 z-20">
              <h2 className="text-xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Snack Menu</h2>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 whitespace-nowrap rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${activeCategory === cat ? 'bg-[var(--premium-gold)] text-black border-[var(--premium-gold)]' : 'bg-black/50 text-white/70 border-white/10 hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
              {filteredMenu.map((item: any) => (
                <div key={item.id} className="glass-panel p-3 rounded-xl flex gap-4">
                  <div className="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-lg font-black text-[var(--premium-gold)]">₹{item.price}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-auto px-4 h-8 rounded-full bg-[var(--premium-gold)] text-black font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(207,168,94,0.3)] hover:scale-105 transition-transform"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Cart Panel */}
            {cart.length > 0 && (
              <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-black via-black/90 to-transparent pt-12">
                <div className="container mx-auto px-0 max-w-2xl">
                  <div className="bg-[#111] border border-[var(--premium-gold)]/30 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">{cart.reduce((a,c)=>a+c.qty,0)} Items</span>
                      <span className="text-xl font-black text-[var(--premium-gold)]">₹{cartTotal}</span>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[var(--premium-gold)] text-black font-bold uppercase tracking-widest text-sm rounded-lg flex items-center gap-2 hover:bg-white transition-colors"
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
              <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Select Screen</h2>
            </div>

            <div className="grid gap-4 mb-8">
              {['Audi-1', 'Audi-2', 'Audi-3'].map((audi) => (
                <button
                  key={audi}
                  onClick={() => setScreen(audi)}
                  className={`w-full py-6 rounded-xl flex items-center justify-center text-xl font-bold uppercase tracking-widest transition-colors ${screen === audi ? 'bg-[var(--premium-gold)] text-black shadow-[0_0_20px_rgba(207,168,94,0.4)]' : 'bg-black/50 border border-white/10 text-white hover:border-[var(--premium-gold)]/50'}`}
                >
                  {audi}
                </button>
              ))}
            </div>
            
            <button 
                onClick={() => setStep(3)}
                disabled={!screen}
                className="w-full py-4 bg-[var(--premium-gold)] disabled:bg-white/5 text-black disabled:text-gray-500 font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_0_20px_rgba(207,168,94,0.3)] disabled:shadow-none"
              >
                Continue <ArrowRight size={18} />
              </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <button onClick={() => setStep(2)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronRight className="rotate-180" size={16} /></button>
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
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--premium-gold)] transition-colors"
                />
                {customer.phone.length > 0 && customer.phone.length < 10 && <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit number</p>}
              </div>

              <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--premium-gold)] mb-4">Order Summary</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">Screen</span>
                  <span className="text-white font-bold">{screen}</span>
                </div>
                <div className="mb-3 border-b border-white/10 pb-3">
                  {cart.map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-300">{c.qty}x {c.item.name}</span>
                      <span className="text-white">₹{c.item.price * c.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-black text-lg">Total</span>
                  <span className="text-[var(--premium-gold)] font-black text-xl">₹{cartTotal}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)}
              disabled={customer.phone.length !== 10}
              className="w-full py-4 bg-[var(--premium-gold)] text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,168,94,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
            >
              Proceed to Payment
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-2xl text-center">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <button onClick={() => setStep(3)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">UPI Payment</h2>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm">Scan the QR code below using any UPI app</p>

            <div className="bg-white p-4 rounded-2xl w-64 h-64 mx-auto mb-8 flex items-center justify-center shadow-lg shadow-white/5">
                <QrCodeIcon size={200} className="text-black" />
            </div>

            <div className="flex justify-between items-center border border-white/10 bg-black/50 rounded-xl p-4 mb-8 max-w-sm mx-auto">
                <span className="text-gray-300 font-bold uppercase tracking-wider text-sm">Amount to Pay</span>
                <span className="text-[var(--premium-gold)] font-black text-2xl">₹{cartTotal}</span>
            </div>

            <button 
              onClick={placeOrder}
              disabled={isOrdering}
              className="w-full max-w-sm mx-auto py-4 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all disabled:opacity-50"
            >
              <CheckCircle2 size={18} /> {isOrdering ? 'Processing...' : 'Payment Completed'}
            </button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 glass-panel rounded-3xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            
            <h2 className="text-3xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-2">Order placed successfully!</h2>
            <p className="text-[var(--premium-gold)] font-black tracking-widest text-4xl mb-6 uppercase border border-[var(--premium-gold)]/30 bg-[var(--premium-gold)]/10 px-6 py-3 rounded-2xl shadow-lg">{generatedOrder?.id}</p>
            
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-8 w-full max-w-sm flex flex-col justify-center items-center text-center">
              <span className="text-gray-500 block uppercase font-bold mb-2">Instructions</span>
              <span className="text-xl font-bold text-white uppercase tracking-wider text-red-400">Collect from snack counter</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">({screen})</span>
            </div>

            <button onClick={() => window.location.href='/'} className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-colors">
              Return to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

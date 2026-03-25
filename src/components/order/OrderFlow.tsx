"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Search, CheckCircle2, ChevronRight, X, Clock, Users, ArrowRight, Smartphone, Ticket } from 'lucide-react';

// Mock Data
const MENU_ITEMS = [
  { id: 1, name: 'Cinemax Classic Popcorn', type: 'Popcorn', price: 180, img: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=200', desc: 'Butter salted large popcorn' },
  { id: 2, name: 'Premium Caramel Popcorn', type: 'Popcorn', price: 220, img: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=200', desc: 'Handcrafted golden caramel' },
  { id: 3, name: 'Cheese Nachos Deluxe', type: 'Nachos', price: 250, img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=200', desc: 'Jalapenos and extra liquid cheese' },
  { id: 4, name: 'Crispy Chicken Burger', type: 'Burger', price: 190, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200', desc: 'Spicy chicken patty with mayo' },
  { id: 5, name: 'Coca Cola Large', type: 'Beverage', price: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200', desc: 'Chilled 500ml' },
  { id: 6, name: 'Blockbuster Combo', type: 'Combo', price: 450, img: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=200', desc: '1 Large Popcorn + 2 Coke + Nachos' },
];

export default function OrderFlow() {
  const searchParams = useSearchParams();
  const initialSeat = searchParams.get('seat') || '';
  
  const [step, setStep] = useState(initialSeat ? 2 : 1);
  const [seatNum, setSeatNum] = useState(initialSeat);
  const [audi, setAudi] = useState('Audi 1 (RGB Laser)');
  const [cart, setCart] = useState<{item: any, qty: number}[]>([]);
  const [customer, setCustomer] = useState({ phone: '', bookingId: '', payment: 'upi' });
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Popcorn', 'Nachos', 'Burger', 'Beverage', 'Combo'];

  const filteredMenu = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.type === activeCategory);

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

  const placeOrder = () => {
    setStep(4);
    // In real app: call API here
  };

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-[var(--premium-gold)] text-black shadow-[0_0_15px_rgba(207,168,94,0.5)]' : 'bg-black border border-white/20 text-gray-500'}`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-2xl">
            <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-2 text-white text-center">Seat Selection</h2>
            <p className="text-gray-400 text-sm text-center mb-8">Scan QR on your armrest or enter manually</p>
            
            <button className="w-full py-6 md:py-8 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-[var(--premium-gold)]/50 transition-colors group mb-6">
              <div className="p-4 bg-white/5 rounded-full group-hover:bg-[var(--premium-gold)]/10 transition-colors text-white group-hover:text-[var(--premium-gold)]">
                <QrCode size={40} />
              </div>
              <span className="font-bold uppercase tracking-wider text-sm group-hover:text-[var(--premium-gold)]">Scan QR Code</span>
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">OR</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Enter Seat Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. G14" 
                  value={seatNum}
                  onChange={(e) => setSeatNum(e.target.value.toUpperCase())}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white uppercase text-xl font-bold tracking-widest focus:outline-none focus:border-[var(--premium-gold)] transition-colors text-center"
                />
              </div>
              
              <button 
                onClick={() => setStep(2)}
                disabled={!seatNum}
                className="w-full py-4 bg-[var(--premium-gold)] disabled:bg-white/5 text-black disabled:text-gray-500 font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_0_20px_rgba(207,168,94,0.3)] disabled:shadow-none"
              >
                Continue to Menu <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-xl flex justify-between items-center sticky top-20 z-20">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Delivering to</span>
                <span className="text-xl font-black text-[var(--premium-gold)] uppercase tracking-wider">{seatNum} • {audi}</span>
              </div>
              <button onClick={() => setStep(1)} className="text-xs text-white/60 hover:text-white underline uppercase">Change Seat</button>
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
              {filteredMenu.map(item => (
                <div key={item.id} className="glass-panel p-3 rounded-xl flex gap-4">
                  <div className="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-black text-[var(--premium-gold)]">₹{item.price}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--premium-gold)] hover:text-black flex items-center justify-center transition-colors text-white"
                      >
                        +
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
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[var(--premium-gold)] text-black font-bold uppercase tracking-widest text-sm rounded-lg flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      Checkout <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <button onClick={() => setStep(2)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronRight className="rotate-180" size={16} /></button>
              <h2 className="text-2xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white">Checkout</h2>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block flex items-center gap-2">
                  <Smartphone size={14} /> Phone Number (For WhatsApp Updates)
                </label>
                <input 
                  type="tel" 
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--premium-gold)] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block flex items-center gap-2">
                  <Ticket size={14} /> Booking ID (Optional for fast delivery)
                </label>
                <input 
                  type="text" 
                  value={customer.bookingId}
                  onChange={(e) => setCustomer({...customer, bookingId: e.target.value})}
                  placeholder="e.g. BMS123XXXX"
                  className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--premium-gold)] transition-colors font-mono uppercase text-sm"
                />
              </div>

              <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {['UPI', 'Card', 'Cash on Delivery'].map((method) => (
                    <label key={method} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${customer.payment === method.toLowerCase() ? 'border-[var(--premium-gold)] bg-[var(--premium-gold)]/10' : 'border-white/10 hover:border-white/30 bg-black/50'}`}>
                      <span className="text-sm font-bold text-white">{method}</span>
                      <input 
                        type="radio" 
                        name="payment" 
                        className="hidden" 
                        checked={customer.payment === method.toLowerCase()}
                        onChange={() => setCustomer({...customer, payment: method.toLowerCase()})}
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${customer.payment === method.toLowerCase() ? 'border-[var(--premium-gold)]' : 'border-white/30'}`}>
                        {customer.payment === method.toLowerCase() && <div className="w-2 h-2 rounded-full bg-[var(--premium-gold)]"></div>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={placeOrder}
              disabled={cart.length === 0 || !customer.phone}
              className="w-full py-4 bg-[var(--premium-gold)] text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,168,94,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
            >
              Pay ₹{cartTotal} & Place Order
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 glass-panel rounded-3xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            
            <h2 className="text-4xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-2">Order Received!</h2>
            <p className="text-[var(--premium-gold)] font-bold tracking-widest text-lg mb-6 uppercase">Order #RCX{Math.floor(1000 + Math.random() * 9000)}</p>
            
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-8 w-full max-w-sm flex justify-between items-center text-left">
              <div>
                <span className="text-xs text-gray-500 block uppercase font-bold mb-1">Delivering to</span>
                <span className="text-2xl font-black text-white">{seatNum}</span>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block uppercase font-bold mb-1">Est. Time</span>
                <span className="text-xl font-bold text-green-400">5-8 Mins</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-8">
              We'll send order updates to your WhatsApp number. Relax and enjoy the movie!
            </p>

            <button onClick={() => window.location.href='/'} className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-colors">
              Return to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

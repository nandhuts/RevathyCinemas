import HeroSection from '@/components/home/HeroSection';
import PremiumFeatures from '@/components/home/PremiumFeatures';
import { getMovies } from '@/lib/getMovies';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <HeroSection />

      {/* Order Process Section */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-4">
              How It <span className="primary-text-gradient">Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">4 simple steps to enjoy your snacks without missing the movie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Select Snacks', desc: 'Browse our premium digital menu directly from your phone.', icon: '🍿' },
              { step: '02', title: 'Choose Audi', desc: 'Select which screen you are watching the movie in.', icon: '🎬' },
              { step: '03', title: 'Pay using UPI', desc: 'Secure and instant payment using any UPI app.', icon: '💳' },
              { step: '04', title: 'Collect from Counter', desc: 'Pick up your order from the priority counter instantly.', icon: '🛍️' }
            ].map((s, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--primary-accent)]/50 transition-all hover:-translate-y-2">
                <div className="text-[var(--primary-accent)]/10 text-8xl font-black absolute -bottom-4 -right-4 transition-transform group-hover:scale-110">{s.step}</div>
                <div className="text-4xl mb-6 relative z-10">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{s.title}</h3>
                <p className="text-gray-400 text-sm relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Activity Section */}
      <section className="py-24 bg-[#010105] relative border-y border-[var(--primary-accent)]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary-accent)] to-transparent opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--primary-accent)]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[var(--primary-accent)] text-sm font-bold uppercase tracking-widest mb-4 block animate-pulse">Live Operations</span>
            <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-6 text-white leading-tight">
              System <span className="primary-text-gradient">Activity</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our automated kitchens are designed for high throughput during intervals ensuring absolute quality and speed.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Avg Wait Time', value: '< 5 Mins', color: 'text-green-400' },
              { label: 'Active Screens', value: '3 / 3', color: 'text-[var(--primary-accent)]' },
              { label: 'Orders Processed', value: '1,204+', color: 'text-yellow-400' },
              { label: 'Quality Rating', value: '4.9/5', color: 'text-purple-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-black/50 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-md hover:border-[var(--primary-accent)]/30 transition-colors">
                <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] font-mono`}>{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Experience Section */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-6">
            The Priority <span className="primary-text-gradient">Counter</span>
          </h2>
          <p className="text-gray-400 text-lg mb-16">
            Bypass the long interval queues. Your order is prepared asynchronously and packed. Just show your Order ID and walk away with your snacks in seconds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-[#1e0b36] rounded-2xl flex items-center justify-center text-[var(--primary-accent)] mb-6 shadow-[0_0_20px_rgba(30,11,54,0.8)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Zero Waiting Time</h3>
              <p className="text-sm text-gray-500">Order from your seat, collect from the counter without any queues.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-[#1e0b36] rounded-2xl flex items-center justify-center text-[var(--primary-accent)] mb-6 shadow-[0_0_20px_rgba(30,11,54,0.8)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Guaranteed Quality</h3>
              <p className="text-sm text-gray-500">Freshly prepared right before the interval ensuring the best taste.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-[#1e0b36] rounded-2xl flex items-center justify-center text-[var(--primary-accent)] mb-6 shadow-[0_0_20px_rgba(30,11,54,0.8)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Ultimate Experience</h3>
              <p className="text-sm text-gray-500">Feel like a VIP while everyone else waits in line for their popcorn.</p>
            </div>
          </div>
        </div>
      </section>
      
      <PremiumFeatures />
    </>
  );
}

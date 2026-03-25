import HeroSection from '@/components/home/HeroSection';
import MovieCarousel from '@/components/home/MovieCarousel';
import PremiumFeatures from '@/components/home/PremiumFeatures';
import { getMovies } from '@/lib/getMovies';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const movies = await getMovies();
  
  return (
    <>
      <HeroSection />
      <div className="relative z-10 -mt-20">
        <MovieCarousel movies={movies} />
      </div>
      <PremiumFeatures />
      
      {/* Interval / Orders Demo Section */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--premium-gold)]/20 rounded-full blur-[80px]"></div>
            
            <div className="flex-1 relative z-10 z-10">
              <span className="text-[var(--premium-gold)] text-sm font-bold uppercase tracking-widest mb-4 block">Smart Order System</span>
              <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-6 text-white">
                Don't Miss <br /> A <span className="gold-text-gradient">Single Frame</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                Experience seamless food ordering right from your seat. No standing in lines during the interval. Order fresh popcorn, snacks, and beverages with a simple scan.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-[var(--premium-gold)]/20 flex items-center justify-center text-[var(--premium-gold)] font-bold text-xs">1</span>
                  Scan the QR code on your seat armrest
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-[var(--premium-gold)]/20 flex items-center justify-center text-[var(--premium-gold)] font-bold text-xs">2</span>
                  Browse our premium digital menu
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-[var(--premium-gold)]/20 flex items-center justify-center text-[var(--premium-gold)] font-bold text-xs">3</span>
                  Enjoy quick delivery to your exact seat
                </li>
              </ul>
              
              <a href="/order" className="inline-block px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold uppercase rounded-full transition-colors text-sm tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Try Demo Order
              </a>
            </div>
            
            <div className="w-full md:w-1/3 relative z-10">
              <div className="aspect-[9/16] bg-[#0a0a0a] rounded-[2rem] border-4 border-gray-800 p-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                <div className="h-full w-full bg-black rounded-xl border border-white/5 p-4 flex flex-col">
                  {/* Mock App UI */}
                  <div className="flex justify-between items-center mb-6 mt-4">
                    <span className="text-[10px] font-bold text-[var(--premium-gold)] tracking-widest uppercase">Seat G14</span>
                    <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded">LIVE SHOW</span>
                  </div>
                  <h3 className="text-lg font-black font-[var(--font-cinematic)] text-white mb-2 uppercase">Menu</h3>
                  
                  <div className="space-y-3 flex-1 overflow-hidden">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-3 bg-white/5 p-2 rounded-lg border border-white/5 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                        <div className="w-16 h-16 bg-white/10 rounded-md"></div>
                        <div className="flex-1 py-1">
                          <div className="w-20 h-3 bg-white/20 rounded mb-2"></div>
                          <div className="w-12 h-3 bg-[var(--premium-gold)]/40 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

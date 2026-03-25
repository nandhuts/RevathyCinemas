import { PlayCircle, Ticket, Clock, Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Now Showing | Revathy Cinemax',
};

import { getMovies } from '@/lib/getMovies';
import AutoRefresher from '@/components/AutoRefresher';

export const dynamic = 'force-dynamic';

export default async function MoviesPage() {
  const MOVIES = await getMovies();
  
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <AutoRefresher />
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-4 text-white">
          Now <span className="gold-text-gradient">Showing</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mb-16 text-lg">
          Experience the magic of cinema on the biggest screen in Kollam with state-of-the-art RGB Real Laser projection.
        </p>

        <div className="space-y-16">
          {MOVIES.map((movie) => (
            <div key={movie.id} className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col lg:flex-row gap-8 lg:gap-12 hover:border-[var(--premium-gold)]/30 transition-colors">

              {/* Poster */}
              <div className="w-full lg:w-1/3 xl:w-1/4 aspect-[2/3] rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.8)] group shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${movie.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
                  <PlayCircle size={64} className="text-[var(--premium-gold)] animate-pulse" />
                </button>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex gap-1.5 items-center border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20">
                  <Star size={14} className="text-[var(--premium-gold)]" fill="currentColor" />
                  <span className="text-sm font-bold text-white">{movie.rating}</span>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">{movie.language}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2"><Clock size={12} /> {movie.duration}</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider text-white mb-2">{movie.title}</h2>
                <div className="flex gap-2 mb-8">
                  {movie.genres.map((g: string) => (
                    <span key={g} className="text-xs text-[var(--premium-gold)] uppercase font-bold tracking-widest">{g}</span>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4 flex items-center gap-2">
                    <MapPin size={16} /> RGB Real Laser • Audi 1
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.showtimes.map((st: any, i: number) => (
                      <div key={i} className="flex flex-col gap-1 items-center">
                        <button
                          className={`px-6 py-3 rounded-xl border text-sm font-bold tracking-wider transition-all disabled:opacity-50
                            ${st.status === 'Housefull'
                              ? 'border-red-500/30 text-red-500/50 cursor-not-allowed bg-red-500/5'
                              : 'border-white/20 text-white hover:border-[var(--premium-gold)] hover:bg-[var(--premium-gold)]/10'}`}
                          disabled={st.status === 'Housefull'}
                        >
                          {st.time}
                        </button>
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${st.status === 'Available' ? 'text-green-500' : st.status === 'Housefull' ? 'text-red-500' : 'text-orange-400'}`}>
                          {st.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20260324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[var(--premium-red)] hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6)]"
                  >
                    <Ticket size={20} /> Book Tickets
                  </a>
                  <a 
                    href={movie.trailer || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 group"
                  >
                    <PlayCircle size={20} className="group-hover:scale-110 transition-transform" /> Watch Trailer
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

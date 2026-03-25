"use client";

import { motion } from 'framer-motion';
import { PlayCircle, Ticket, Clock, Star } from 'lucide-react';

export default function MovieCarousel({ movies }: { movies: any[] }) {
  return (
    <section className="py-24 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-2 text-white">
              Now <span className="gold-text-gradient">Showing</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <p className="text-gray-400 tracking-[0.2em] text-sm font-bold uppercase">Experience in RGB Laser</p>
            </div>
          </div>

          <a href="/movies" className="text-[var(--premium-gold)] uppercase text-sm font-semibold tracking-wider hover:text-white transition-colors border-b border-[var(--premium-gold)]/30 hover:border-white pb-1">
            View All Movies
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {movies.map((movie: any, idx: number) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(207,168,94,0.1)]"
            >
              {/* Poster Image */}
              <div className="relative h-[450px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${movie.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Float badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {movie.language}
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--premium-gold)]/20 backdrop-blur-md border border-[var(--premium-gold)]/50 rounded-full text-xs font-bold text-[var(--premium-gold)] flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {movie.rating}
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                  <h3 className="text-3xl font-black font-[var(--font-cinematic)] uppercase tracking-widest text-white mb-2 transform transition-transform group-hover:text-[var(--premium-gold)]">
                    {movie.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre: string) => (
                      <span key={genre} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="p-6 bg-[#0a0a0a] border-t border-white/5 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={16} className="text-[var(--premium-gold)]" />
                    <span>Today's Shows</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.map((st: any, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-bold text-gray-300 transition-colors cursor-pointer">
                        {st.time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <a
                    href="https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20260324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-[var(--premium-red)] hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider text-center rounded-lg transition-colors flex justify-center items-center gap-2"
                  >
                    <Ticket size={16} /> Book
                  </a>
                  <a
                    href={movie.trailer || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white text-sm font-bold uppercase tracking-wider text-center rounded-lg transition-colors flex justify-center items-center gap-2 hover:border-white/30"
                  >
                    <PlayCircle size={16} /> Trailer
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from 'framer-motion';
import { Ticket, Popcorn, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background with cinematic grading */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rotate-0 scale-100 transition-transform duration-[20s] ease-linear hover:scale-110"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>
      
      {/* Cinematic Projector Beam Effect */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-0 right-0 w-[150%] h-[150%] bg-[conic-gradient(from_230deg_at_70%_-10%,rgba(255,255,255,0.15)_0deg,transparent_40deg,transparent_320deg,rgba(255,255,255,0.15)_360deg)] z-0 pointer-events-none origin-top-right mix-blend-screen"
      ></motion.div>

      {/* Floating Projector Dust */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full z-0 opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 2 + 0.5
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-[var(--premium-gold)] bg-[var(--premium-gold)]/10 text-[var(--premium-gold)] text-xs font-bold tracking-[0.2em] mb-6 uppercase">
            Parippally, Kollam
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-[var(--font-cinematic)] leading-tight mb-4 tracking-wide text-white drop-shadow-[0_0_20px_rgba(207,168,94,0.3)]">
            EXPERIENCE
            <br />
            <span className="gold-text-gradient">RGB REAL LASER</span>
            <br />
            & DOLBY ATMOS
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-light">
            Step into the future of cinema. Enjoy crystal-clear 4K projection, earth-shattering sound, and our revolutionary smart snack ordering system.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <a
              href="https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20240324"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[var(--premium-red)] hover:bg-red-700 text-white font-bold rounded-full transition-all overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,0,0,0.6)] hover:shadow-[0_0_30px_rgba(139,0,0,0.8)] hover:-translate-y-1"
            >
              <Ticket className="relative z-10" />
              <span className="relative z-10 uppercase tracking-wider">Book Tickets</span>
            </a>

            <Link
              href="/order"
              className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[var(--premium-gold)]/50 text-[var(--premium-gold)] font-bold rounded-full transition-all flex items-center justify-center gap-3 hover:-translate-y-1 shadow-[0_0_15px_rgba(207,168,94,0.15)]"
            >
              <Popcorn className="relative z-10" />
              <span className="relative z-10 uppercase tracking-wider">Order Snacks Now</span>
            </Link>

            <button className="flex items-center justify-center gap-2 px-6 py-4 text-white hover:text-[var(--premium-gold)] transition-colors group">
              <PlayCircle className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold tracking-wide uppercase">Watch Tour</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 font-bold z-10">Scroll</span>
        <div className="w-[1px] h-[30px] bg-gradient-to-b from-[var(--premium-gold)] to-transparent z-10"></div>
      </motion.div>
    </section>
  );
}

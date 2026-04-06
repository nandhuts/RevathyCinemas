"use client";

import { motion } from 'framer-motion';
import { Ticket, Popcorn, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] py-32 w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video / Image with Parallax Zoom */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop")' }}
      ></motion.div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      
      {/* Cinematic Glowing Orb */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary-accent)]/10 rounded-full blur-[150px] z-0 pointer-events-none mix-blend-screen"
      ></motion.div>

      {/* Floating Projector Dust */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--primary-accent)] rounded-full z-0 opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 2 + 0.5
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80 z-0"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left pb-12 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-2 rounded-full border-2 border-[var(--primary-accent)] bg-[#050505]/50 backdrop-blur-md text-[var(--primary-accent)] text-xs font-bold tracking-[0.2em] mb-6 uppercase shadow-[0_0_15px_var(--primary-glow)]"
          >
            Revathy Cinemax Paripally
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black font-[var(--font-cinematic)] leading-tight mb-4 tracking-wide text-white drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            ORDER SNACKS
            <br />
            <span className="primary-text-gradient">EASILY DURING</span>
            <br />
            YOUR MOVIE
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-light">
            Skip the queue. Order directly from your phone and collect from the counter without missing a scene.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Link
              href="/order"
              className="group relative px-8 py-4 bg-[var(--primary-accent)] hover:bg-white text-[#050505] font-black rounded-full transition-all overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_40px_var(--primary-glow)] hover:-translate-y-1 transform animate-pulse-glow"
            >
              <Popcorn className="relative z-10" />
              <span className="relative z-10 uppercase tracking-widest text-sm">Order Now</span>
            </Link>

            <a
              href="https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20240324"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
            >
              <Ticket className="relative z-10 text-[var(--premium-red)]" />
              <span className="relative z-10 uppercase tracking-wider text-sm">Book Tickets</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
      >
        <span className="text-[10px] uppercase tracking-widest mb-3 font-bold z-10 text-[var(--primary-accent)]">Explore</span>
        <div className="w-[2px] h-[40px] bg-gradient-to-b from-[var(--primary-accent)] to-transparent z-10 rounded-full"></div>
      </motion.div>
    </section>
  );
}


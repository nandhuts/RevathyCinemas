"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Ticket, Popcorn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
    { name: 'Order Food', href: '/order' },
    { name: 'Premium Features', href: '/#premium-features' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col z-50 relative shrink-0">
          <span className="text-xl lg:text-2xl font-black tracking-wider gold-text-gradient font-[var(--font-cinematic)]">
            REVATHY CINEMAX
          </span>
          <span className="text-[0.6rem] lg:text-xs text-red-500 font-bold tracking-[0.2em] uppercase">
            RGB Real Laser
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center bg-black/40 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md shrink-0">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-[var(--premium-gold)] transition-colors relative group whitespace-nowrap">
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[var(--premium-gold)] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex gap-3 shrink-0">
          <Link href="/order" className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full transition-colors border border-white/10 whitespace-nowrap">
            <Popcorn size={16} className="text-[var(--premium-gold)]" />
            <span className="text-white">Order Seat</span>
          </Link>
          <a href="https://in.bookmyshow.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold bg-[var(--premium-red)] hover:bg-red-700 px-4 py-2.5 rounded-full transition-colors shadow-[0_0_15px_rgba(139,0,0,0.5)] whitespace-nowrap">
            <Ticket size={16} />
            <span className="text-white">Book Tickets</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden z-50 text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 pt-20"
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-300 hover:text-[var(--premium-gold)] transition-colors">
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-4">
              <Link href="/order" onClick={() => setMobileMenuOpen(false)} className="flex justify-center items-center gap-2 bg-white/10 border border-white/20 py-4 rounded-xl">
                <Popcorn size={20} className="text-[var(--premium-gold)]" />
                <span className="text-white font-bold">Smart Order</span>
              </Link>
              <a href="https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20260324" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 bg-[var(--premium-red)] py-4 rounded-xl shadow-[0_0_20px_rgba(139,0,0,0.4)]">
                <Ticket size={20} className="text-white" />
                <span className="text-white font-bold">Book on BookMyShow</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

'use client';

import { Globe, Share2, MapPin, Phone, MessageCircle, Map } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/counter')) {
    return null;
  }

  return (
    <footer className="bg-[#050505] text-gray-400 py-16 border-t border-[var(--primary-accent)]/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[var(--primary-accent)]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <img src="/logo.png" alt="Revathy Cinemax Logo" className="w-12 h-12 lg:w-16 lg:h-16 object-contain transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-wider primary-text-gradient font-[var(--font-cinematic)]">
                REVATHY CINEMAX
              </span>
              <span className="text-xs text-[var(--primary-accent)] font-bold tracking-[0.2em] uppercase">
                RGB Real Laser
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Experience the magic of cinema with cutting-edge RGB Real Laser projection and Dolby Atmos sound in Parippally, Kollam.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/revathycinemax/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-[var(--primary-accent)]/20 hover:text-[var(--primary-accent)] hover:-translate-y-2 transition-all shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_5px_15px_var(--primary-glow)]">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/revathyXsara/" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-[var(--primary-accent)]/20 hover:text-[var(--primary-accent)] hover:-translate-y-2 transition-all shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_5px_15px_var(--primary-glow)]">
              <FacebookIcon />
            </a>
            <a href="https://wa.me/919746625026" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 hover:text-green-500 hover:-translate-y-2 transition-all shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_5px_15px_rgba(34,197,94,0.4)]">
              <MessageCircle size={20} />
            </a>
            <a href="https://maps.google.com" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 hover:-translate-y-2 transition-all shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
              <Map size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Now Showing</Link></li>
            <li><Link href="/movies" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Coming Soon</Link></li>
            <li><Link href="/order" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-flex items-center gap-2 transition-transform"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-pulse-glow" />Smart Snack Order</Link></li>
            <li><Link href="/admin/dashboard" className="hover:text-[var(--primary-accent)] transition-colors"></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Legal & Help</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Refund Policy</a></li>
            <li><Link href="/contact" className="hover:text-[var(--primary-accent)] hover:translate-x-1 inline-block transition-transform">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <MapPin size={20} className="text-[var(--primary-accent)] shrink-0 mt-0.5 group-hover:animate-bounce-subtle" />
              <span className="group-hover:text-white transition-colors">Kulamada, Parippally, Kollam, Kerala</span>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone size={20} className="text-[var(--primary-accent)] shrink-0 group-hover:animate-bounce-subtle" />
              <span className="group-hover:text-white transition-colors">+91 97466 25026</span>
            </li>
            <li className="flex items-center gap-3 group">
              <MessageCircle size={20} className="text-green-500 shrink-0 group-hover:animate-bounce-subtle" />
              <a href="https://wa.me/919746625026" className="hover:text-white transition-colors">WhatsApp Order Support</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/5 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Revathy Cinemax. All rights reserved.</p>
        <p className="mt-2 text-gray-600"><a href="https://instagram.com/aaasta.h" target="_blank" className="hover:text-gray-400">Developed by Anandhu Digital Solutions</a></p>
      </div>
    </footer>
  );
}

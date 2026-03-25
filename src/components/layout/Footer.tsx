import { Globe, Share2, MapPin, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[var(--premium-gold)]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex flex-col mb-6">
            <span className="text-xl md:text-2xl font-black tracking-wider gold-text-gradient font-[var(--font-cinematic)]">
              REVATHY CINEMAX
            </span>
            <span className="text-xs text-red-500 font-bold tracking-[0.2em] uppercase">
              RGB Real Laser
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Experience the magic of cinema with cutting-edge RGB Real Laser projection and Dolby Atmos sound in Karippally, Kollam.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--premium-gold)]/20 hover:text-[var(--premium-gold)] transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--premium-gold)]/20 hover:text-[var(--premium-gold)] transition-colors">
              <Share2 size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-[var(--premium-gold)] transition-colors">Now Showing</Link></li>
            <li><Link href="/movies" className="hover:text-[var(--premium-gold)] transition-colors">Coming Soon</Link></li>
            <li><Link href="/order" className="hover:text-[var(--premium-gold)] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />Smart Snack Order</Link></li>
            <li><Link href="/admin/dashboard" className="hover:text-[var(--premium-gold)] transition-colors"></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Legal & Help</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-[var(--premium-gold)] transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[var(--premium-gold)] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[var(--premium-gold)] transition-colors">Refund Policy</a></li>
            <li><Link href="/contact" className="hover:text-[var(--premium-gold)] transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-[var(--premium-gold)] shrink-0 mt-0.5" />
              <span>Kulamada, Parippally, Kollam, Kerala</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-[var(--premium-gold)] shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={20} className="text-green-500 shrink-0" />
              <a href="https://wa.me/91XXXXXXXXXX" className="hover:text-white transition-colors">WhatsApp Order Support</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/5 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Revathy Cinemax. All rights reserved.</p>
        <p className="mt-2 text-gray-600">Smart Cinema Management System</p>
      </div>
    </footer>
  );
}

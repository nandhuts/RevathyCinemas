import { Globe, Share2, MapPin, Phone, MessageCircle, Map } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[var(--premium-gold)]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Revathy Cinemax Logo" className="w-12 h-12 lg:w-16 lg:h-16 object-contain" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-wider gold-text-gradient font-[var(--font-cinematic)]">
                REVATHY CINEMAX
              </span>
              <span className="text-xs text-red-500 font-bold tracking-[0.2em] uppercase">
                RGB Real Laser
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Experience the magic of cinema with cutting-edge RGB Real Laser projection and Dolby Atmos sound in Karippally, Kollam.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/revathycinemax/" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-[var(--premium-gold)]/20 hover:text-[var(--premium-gold)] transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/revathyXsara/" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-[var(--premium-gold)]/20 hover:text-[var(--premium-gold)] transition-colors">
              <FacebookIcon />
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-green-500/20 hover:text-green-500 transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="https://maps.google.com" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors">
              <Map size={20} />
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

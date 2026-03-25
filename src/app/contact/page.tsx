import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Revathy Cinemax',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-6 text-white text-center">
          Get in <span className="gold-text-gradient">Touch</span>
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
          We'd love to hear from you. Whether you have questions about bookings, our smart food delivery system, or general inquiries.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl flex items-start gap-6 border-l-4 border-[var(--premium-gold)] hover:bg-white/5 transition-colors">
              <div className="p-4 bg-[var(--premium-gold)]/10 text-[var(--premium-gold)] rounded-2xl shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-[var(--font-cinematic)] uppercase text-white mb-2">Location</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs">
                  Revathy Cinemax RGB Real Laser, <br />
                  Kulamada, Parippally,<br />
                  Kollam, Kerala 691574
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex items-start gap-6 border-l-4 border-white border-opacity-10 hover:border-blue-500 hover:bg-white/5 transition-colors">
              <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl shrink-0">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-[var(--font-cinematic)] uppercase text-white mb-2">Phone</h3>
                <p className="text-gray-400 text-xl font-mono tracking-widest">+91 90000 12345</p>
                <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-bold">10:00 AM - 10:00 PM</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex items-start gap-6 border-l-4 border-white border-opacity-10 hover:border-green-500 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-[var(--font-cinematic)] uppercase text-white mb-2">WhatsApp</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Instant support for seat delivery and general queries.
                </p>
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-500 font-bold uppercase tracking-widest text-sm group-hover:text-white group-hover:underline transition-all"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>

          {/* Map Display */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative h-[500px]">
            {/* Mock Google Maps embed wrapper for visual purposes */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3942.726229244321!2d76.76969507501629!3d8.811769991241142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNDgnNDIuNCJOIDc2wrA0NicyMC4yIkU!5e0!3m2!1sen!2sin!4v1774370102215!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%) sepia(20%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Revathy Cinemax Location"
            ></iframe>

            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold uppercase tracking-widest text-xs border border-white/20 flex items-center gap-2 shadow-2xl z-10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Open in Google Maps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

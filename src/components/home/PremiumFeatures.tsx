"use client";

import { motion } from 'framer-motion';
import { MonitorPlay, Volume2, Sofa, Popcorn } from 'lucide-react';

const FEATURES = [
  {
    icon: <MonitorPlay size={40} className="text-[var(--premium-gold)]" />,
    title: 'RGB Real Laser',
    description: 'Experience unparalleled brightness, contrast, and color accuracy with our state-of-the-art RGB Real Laser projection system. Every frame is a masterpiece.'
  },
  {
    icon: <Volume2 size={40} className="text-[var(--premium-gold)]" />,
    title: 'Dolby Atmos',
    description: 'Immerse yourself in multidimensional sound that flows all around you with breathtaking realism, transforming ordinary moments into extraordinary experiences.'
  },
  {
    icon: <Sofa size={40} className="text-[var(--premium-gold)]" />,
    title: 'Premium Comfort',
    description: 'Relax in our ergonomically designed plush seating with ample legroom. Engineered for the ultimate cinematic comfort from the first scene to the end credits.'
  },
  {
    icon: <Popcorn size={40} className="text-[var(--premium-gold)]" />,
    title: 'Seat-to-Seat Dining',
    description: 'Skip the interval queues! Order freshly prepared snacks and beverages directly from your phone to your seat using our smart order system.'
  }
];

export default function PremiumFeatures() {
  return (
    <section id="premium-features" className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-[var(--font-cinematic)] uppercase tracking-wider mb-4 text-white">
            Beyond <span className="gold-text-gradient">Ordinary Moviegoing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Revathy Cinemax redefines the cinematic experience in Kollam, blending cutting-edge technology with unparalleled luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-2xl glass-panel text-center hover:bg-white/[0.02] transition-colors border border-white/5 hover:border-[var(--premium-gold)]/30 group"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-[var(--premium-gold)]/10 flex flex-col justify-center items-center mb-6 shadow-[0_0_20px_rgba(207,168,94,0.1)] group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

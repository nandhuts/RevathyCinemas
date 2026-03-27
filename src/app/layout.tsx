import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-cinematic' });

export const metadata: Metadata = {
  title: 'Revathy Cinemax | RGB Real Laser | Parippally',
  description: 'Experience premium cinema in Kollam. RGB Real Laser, Dolby Atmos, and smart seat food delivery at Revathy Cinemax Parippally.',
  keywords: 'Revathy Cinemax, Parippally, Kollam, cinema, movies, tickets, BookMyShow, snacks delivery',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-[var(--premium-gold)] selection:text-black">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

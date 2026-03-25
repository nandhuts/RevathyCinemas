"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const authStatus = localStorage.getItem('revathy_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'revathy' && password === 'snacktime') {
      localStorage.setItem('revathy_admin_auth', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('revathy_admin_auth');
    setIsAuthenticated(false);
  };

  // Still checking localStorage
  if (isAuthenticated === null) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[var(--premium-gold)] border-t-transparent animate-spin"></div></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Cinematic abstract background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--premium-gold)]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[var(--premium-gold)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--premium-gold)]/30">
              <Lock size={32} className="text-[var(--premium-gold)]" />
            </div>
            <h2 className="text-3xl font-black font-[var(--font-cinematic)] uppercase tracking-widest text-white text-center">
              Staff <span className="gold-text-gradient">Portal</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[var(--premium-gold)] transition-colors"
                placeholder="Enter Staff ID"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[var(--premium-gold)] transition-colors"
                placeholder="Enter Password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-pulse">
                Invalid credentials
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-[var(--premium-gold)] hover:bg-white text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(207,168,94,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Access System
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mini logout button floating to top right to allow staff to leave */}
      <button 
        onClick={handleLogout}
        className="fixed bottom-4 right-4 z-50 bg-red-600/20 hover:bg-red-600 text-white border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-lg backdrop-blur-md"
      >
        Sign Out
      </button>
      {children}
    </div>
  );
}

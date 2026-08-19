'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HyktecLogo } from '@/components/brand/HyktecLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
      } else {
        router.push(data.redirectUrl || '/client/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoAdmin = () => {
    setEmail('admin@hyktec.com');
    setPassword('Hyktec2026!');
  };

  const setDemoClient = () => {
    setEmail('client@acmecorp.com');
    setPassword('Client2026!');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-navy-950 text-white relative overflow-hidden py-12">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-hyktec-pink/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <HyktecLogo theme="dark" size="lg" showTagline={true} />
          </div>
          <h1 className="text-2xl font-bold text-white pt-2">Sign in to Hyktec Platform</h1>
          <p className="text-xs text-slate-400">Client Portal & Enterprise Administration Gateway</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-xl">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Credentials */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
              Quick Demo Access
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={setDemoAdmin}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-hyktec-pink transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-hyktec-pink" />
                Super Admin
              </button>

              <button
                type="button"
                onClick={setDemoClient}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-blue-400 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                Client Account
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Hyktec Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}

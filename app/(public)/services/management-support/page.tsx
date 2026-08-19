import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Server, Lock, RefreshCw, Headphones, AlertTriangle } from 'lucide-react';

export default function ManagementSupportPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Technical Maintenance & Infrastructure</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          24/7 Digital Product Management & Support
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Keep your digital products secure, updated, and performing reliably with proactive monitoring, continuous cloud backups, and priority SLA bug resolution.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=management-support"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Get Managed Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center">Maintenance Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Server className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Cloud Infrastructure & DevOps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">24/7 Uptime monitoring, auto-scaling, server optimization, and CDN performance tuning.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Lock className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Security & Backups</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Automated hourly database backups, vulnerability patches, SSL renewals, and DDoS protection.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Headphones className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Priority SLA Ticket Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Dedicated engineering team with sub-1-hour response SLAs for emergency issues.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

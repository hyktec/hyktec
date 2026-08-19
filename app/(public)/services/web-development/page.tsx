import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, Server, Database, Lock, Zap } from 'lucide-react';

export default function WebDevelopmentPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Globe className="w-3.5 h-3.5" />
          <span>Full-Stack Web Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Fast, Scalable Websites & Web Applications
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          High-performance corporate portals, enterprise SaaS web apps, e-commerce platforms, and custom software powered by modern web technologies.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=web-development"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Start Web Development <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center">Web Solutions & Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Globe className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Corporate Websites</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Responsive, lightning-fast business websites built for maximum brand conversion.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Server className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">SaaS Web Platforms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Complex cloud applications with multi-tenant data structures, subscriptions, and custom admin control panels.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Lock className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">API & Custom CMS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Headless content engines, RESTful web services, and enterprise security compliance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { HYKTEC_BRAND, HYKTEC_WHY_US } from '@/lib/constants';
import { ArrowRight, ShieldCheck, Target, Zap, Cpu, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>About HYKTEC</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Digital Technology & Growth Engineers
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          {HYKTEC_BRAND.subheadline}
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-hyktec-pink/20 text-hyktec-pink flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To empower enterprises and ambitious scaleups with resilient, scalable digital products and intelligent automation engines that drive sustainable business growth.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To be the premier digital engineering and AI transformation partner globally, recognized for technical excellence, speed, and long-term client success.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Core Philosophy</h2>
          <p className="text-slate-400 text-sm">{HYKTEC_BRAND.philosophy}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HYKTEC_WHY_US.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to Work with Hyktec?</h3>
          <p className="text-sm text-slate-400">Let’s discuss your project architecture and growth goals.</p>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

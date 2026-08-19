import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck, Zap, Sparkles, Building, Server } from 'lucide-react';

export default function SolutionsPage() {
  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Building className="w-3.5 h-3.5" />
          <span>Enterprise Digital Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Custom Engineered Architecture for Enterprise Growth
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          We build custom software, cross-system integrations, legacy modernizations, and cloud infrastructure engineered specifically for high-growth enterprise operations.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <Server className="w-8 h-8 text-hyktec-pink" />
          <h2 className="text-2xl font-bold text-white">Enterprise Cloud Systems</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            High-concurrency microservices, multi-region database replication, and zero-downtime CI/CD deployment pipelines tailored for enterprise reliability.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <Zap className="w-8 h-8 text-hyktec-pink" />
          <h2 className="text-2xl font-bold text-white">AI Automation Frameworks</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Enterprise LLM fine-tuning, automated document analysis, and custom autonomous AI agents integrated directly into your existing ERP and CRM systems.
          </p>
        </div>
      </section>
    </div>
  );
}

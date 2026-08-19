import React from 'react';
import Link from 'next/link';
import { CORE_SERVICES } from '@/lib/constants';
import { ArrowRight, CheckCircle2, TrendingUp, Smartphone, Globe, Cpu, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const iconMap: Record<string, React.ElementType> = {
    TrendingUp,
    Smartphone,
    Globe,
    Cpu,
    ShieldCheck,
  };

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Our Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Comprehensive Digital Technology Services
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          From custom mobile app engineering and cloud web solutions to data-driven marketing campaigns and AI automation agents.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {CORE_SERVICES.map((srv, idx) => {
          const IconComponent = iconMap[srv.iconName] || Globe;
          return (
            <div
              key={srv.id}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-hyktec-pink/20 text-hyktec-pink flex items-center justify-center">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{srv.title}</h2>
                <p className="text-slate-300 text-base leading-relaxed">{srv.shortDesc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-hyktec-pink shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Link
                  href={`/services/${srv.slug}`}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all text-center"
                >
                  View {srv.title} Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/start-project?service=${srv.slug}`}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-xl transition-all text-center"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

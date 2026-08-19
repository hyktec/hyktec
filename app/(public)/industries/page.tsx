import React from 'react';
import Link from 'next/link';
import { INDUSTRIES_LIST } from '@/lib/constants';
import { ArrowRight, Rocket, ShoppingCart, Activity, DollarSign, Building, GraduationCap, Dumbbell, Utensils, Briefcase, Server } from 'lucide-react';

export default function IndustriesPage() {
  const iconMap: Record<string, React.ElementType> = {
    Rocket,
    ShoppingCart,
    Activity,
    DollarSign,
    Building,
    GraduationCap,
    Dumbbell,
    Utensils,
    Briefcase,
    Server,
  };

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Target Industries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Digital Solutions Tailored for Every Sector
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          We engineer domain-specific software platforms, automation pipelines, and marketing funnels suited to unique industry compliance and workflows.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INDUSTRIES_LIST.map((ind, idx) => {
          const IconComponent = iconMap[ind.icon] || Server;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-hyktec-pink/50 space-y-4 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-hyktec-pink flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{ind.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{ind.desc}</p>
              <div className="pt-2">
                <Link
                  href={`/start-project?industry=${encodeURIComponent(ind.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-hyktec-pink hover:underline"
                >
                  Build Solution for {ind.name} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

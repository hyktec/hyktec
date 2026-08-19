import React from 'react';
import Link from 'next/link';
import { TECH_STACK } from '@/lib/constants';
import { ArrowRight, Code2, Server, Smartphone, Database, Bot, Cloud } from 'lucide-react';

export default function TechnologyPage() {
  const categoryIcons: Record<string, React.ElementType> = {
    Frontend: Code2,
    Backend: Server,
    Mobile: Smartphone,
    Database: Database,
    AI: Bot,
    Infrastructure: Cloud,
  };

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Tech Stack & Infrastructure</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Our Technology Expertise
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          We use battle-tested, high-performance programming languages, cloud frameworks, database engines, and AI models to engineer modern digital products.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(TECH_STACK).map(([category, items]) => {
          const IconComp = categoryIcons[category] || Code2;
          return (
            <div key={category} className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800 text-hyktec-pink">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">{category}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {items.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-navy-950 border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

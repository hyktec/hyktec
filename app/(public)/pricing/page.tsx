import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function PricingPage() {
  let plans = [];
  try {
    plans = await prisma.pricingPlan.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    plans = [];
  }

  // Fallback defaults if DB empty
  const defaultCategories = ['Website', 'App Development', 'Digital Marketing', 'AI Solutions'];

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Flexible Package Options</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Transparent, Value-Driven Investment Plans
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Select a tailored package engineered to scale with your business phase, or request a custom enterprise quote.
        </p>
      </section>

      {/* Pricing Grids */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {defaultCategories.map((cat) => {
          const catPlans = plans.filter((p) => p.category === cat);
          if (catPlans.length === 0) return null;

          return (
            <div key={cat} className="space-y-8">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-extrabold text-white">{cat} Packages</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catPlans.map((plan) => {
                  let features: string[] = [];
                  try {
                    features = JSON.parse(plan.featuresJson || '[]');
                  } catch {
                    features = [];
                  }

                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                        plan.isPopular
                          ? 'bg-slate-900 border-2 border-hyktec-pink shadow-2xl shadow-hyktec-pink/10'
                          : 'bg-slate-900/60 border border-slate-800'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-pink-red text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                          Most Popular
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                            <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                          </div>
                        </div>

                        <ul className="space-y-3 pt-4 border-t border-slate-800/80">
                          {features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <Check className="w-4 h-4 text-hyktec-pink shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8">
                        <Link
                          href={`/start-project?plan=${encodeURIComponent(plan.name)}&service=${encodeURIComponent(plan.category)}`}
                          className={`flex items-center justify-center gap-2 w-full py-3.5 text-xs font-bold rounded-xl transition-all ${
                            plan.isPopular
                              ? 'gradient-pink-red text-white shadow-lg'
                              : 'bg-slate-800 hover:bg-slate-700 text-white'
                          }`}
                        >
                          {plan.ctaText || 'Choose Plan'}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Custom Quote Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Need a Custom Enterprise Solution?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            We architect tailored software, specialized AI agents, and enterprise SLA support packages to meet exact organizational specifications.
          </p>
          <div className="pt-2">
            <Link
              href="/start-project?type=custom"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
            >
              Get a Custom Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

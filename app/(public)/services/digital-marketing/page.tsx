import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Search, Megaphone, BarChart3, Target, Award } from 'lucide-react';

export default function DigitalMarketingPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Growth Strategy & Marketing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Digital Marketing Engineered for Measurable Revenue
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Grow your brand through data-driven performance marketing, technical SEO, high-converting Google & Meta ad campaigns, and conversion rate optimization.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=digital-marketing"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Start Marketing Campaign <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center">Marketing Capabilities & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Technical & Content SEO</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Rank top for high-intent B2B & B2C search terms with schema engineering and content funnels.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Megaphone className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">PPC & Paid Advertising</h3>
            <p className="text-xs text-slate-400 leading-relaxed">High-converting Google Ads, Meta Ads, and LinkedIn campaign management with continuous A/B testing.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <BarChart3 className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Analytics & Conversion Funnels</h3>
            <p className="text-xs text-slate-400 leading-relaxed">End-to-end attribution tracking, heatmaps, and monthly transparent ROI reports.</p>
          </div>
        </div>
      </section>

      {/* Deliverables & FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900/40 p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Campaign Deliverables</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-hyktec-pink" /> Comprehensive Competitor & Market Audit</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-hyktec-pink" /> Custom Ad Copy & High-Converting Landing Pages</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-hyktec-pink" /> Google Analytics 4 & Conversion Pixel Setup</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-hyktec-pink" /> Weekly Bid Optimization & Audience Tuning</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-hyktec-pink" /> Transparent Executive Revenue Reports</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <div className="font-bold text-white text-sm">How fast do we see marketing results?</div>
              <div className="text-slate-400">PPC ads generate qualified leads within 24-48 hours of launch. SEO rankings compound over 60-90 days.</div>
            </div>
            <div>
              <div className="font-bold text-white text-sm">Do you manage ad budgets directly?</div>
              <div className="text-slate-400">Yes, ad accounts remain 100% owned by your company with complete spending transparency.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

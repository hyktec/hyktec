import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">Terms & Conditions</h1>
      <p className="text-xs text-slate-400">Last updated: January 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-white">1. Master Service Agreement</h2>
        <p>By engaging HYKTEC for technology development, digital marketing, AI solutions, or managed support, you agree to the milestone terms and payment schedules outlined in your custom Master Service Agreement.</p>

        <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
        <p>Upon final invoice payment, all custom code, design assets, and intellectual property developed for your project are fully transferred to your company.</p>
      </section>
    </div>
  );
}

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: January 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
        <p>HYKTEC collects company and personal information provided during onboarding, lead forms, and client portal authentication to deliver technology services, billing, and support.</p>

        <h2 className="text-xl font-bold text-white">2. Use of Information</h2>
        <p>Your data is strictly utilized to communicate project milestones, generate invoices, provide technical support, and improve platform performance. We do not sell or trade your data to third parties.</p>

        <h2 className="text-xl font-bold text-white">3. Security</h2>
        <p>We implement enterprise security standards including encrypted TLS transmissions, hashed passwords, and role-isolated databases.</p>
      </section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Rocket, CheckCircle2, ArrowRight, Upload, Sparkles } from 'lucide-react';

export default function StartProjectPage() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'Web Development';
  const initialPlan = searchParams.get('plan') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: initialService,
    budget: '$15,000 - $30,000',
    projectType: 'Web Application',
    expectedTimeline: '2 - 3 Months',
    description: initialPlan ? `Interested in the ${initialPlan} package.` : '',
    websiteUrl: '',
    preferredContact: 'email',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Lead submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="pt-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Rocket className="w-3.5 h-3.5" />
          <span>Project Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Start Your Project with Hyktec</h1>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          Tell us about your project vision, technical scope, and goals. We’ll review your details and send a formal proposal within 24 hours.
        </p>
      </section>

      {/* Form Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Project Brief Submitted!</h2>
            <p className="text-slate-300 text-base max-w-md mx-auto leading-relaxed">
              Your lead inquiry has been registered in our system database. A dedicated Hyktec solutions engineer will prepare your proposal roadmap.
            </p>
            <div className="pt-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Return to Homepage
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Service & Budget */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                1. Project Scope & Category
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Selected Service *</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="App Development">App Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI Solutions">AI Solutions & Automation</option>
                    <option value="Management & Support">Management & Support</option>
                    <option value="Custom Software">Custom Enterprise Software</option>
                    <option value="Other">Other Digital Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Budget *</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                    <option value="$50,000+">$50,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Type</label>
                  <input
                    type="text"
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    placeholder="e.g. SaaS Portal, iOS App, AI Bot"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Expected Timeline</label>
                  <select
                    value={form.expectedTimeline}
                    onChange={(e) => setForm({ ...form, expectedTimeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month)</option>
                    <option value="1 - 2 Months">1 - 2 Months</option>
                    <option value="2 - 3 Months">2 - 3 Months</option>
                    <option value="3+ Months">3+ Months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Client Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                2. Contact & Company Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Global Corp"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@acmeglobal.com"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="United States"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Requirements & Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                3. Detailed Project Requirements
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Description & Goals *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what you want to build, target audience, core features, and business objectives..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Website / App URL (If applicable)</label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting Project Brief...' : 'Submit Project Brief'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

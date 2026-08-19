'use client';

import React, { useState } from 'react';
import { HYKTEC_BRAND } from '@/lib/constants';
import { Mail, Phone, MapPin, Send, CheckCircle2, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.subject || 'General Inquiry',
          description: form.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Headphones className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Contact Hyktec Team</h1>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          Have a technical question, partnership proposal, or project inquiry? Speak directly with our software architects.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Contact Information</h2>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-hyktec-pink shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Email Address</div>
                  <a href={`mailto:${HYKTEC_BRAND.contactEmail}`} className="text-white font-bold hover:text-hyktec-pink">
                    {HYKTEC_BRAND.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-hyktec-pink shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Direct Phone</div>
                  <div className="text-white font-bold">{HYKTEC_BRAND.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hyktec-pink shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Global Office</div>
                  <div className="text-white font-medium">{HYKTEC_BRAND.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to Hyktec. One of our senior tech leads will review your inquiry and respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-extrabold text-white">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Inquiry Topic"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your requirements or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

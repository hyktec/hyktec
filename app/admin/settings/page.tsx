import React from 'react';
import { prisma } from '@/lib/db';
import { HYKTEC_BRAND } from '@/lib/constants';
import { Settings, ShieldCheck, Mail, Lock, Server } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">System Settings & Security</h1>
        <p className="text-xs text-slate-400">Configure core company information, default SEO metadata, authentication rules, and security policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Settings */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-hyktec-pink" /> Company & Branding Defaults
          </h2>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-400 block">Company Name:</span>
              <span className="text-white font-bold">{HYKTEC_BRAND.name}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block">Core Positioning:</span>
              <span className="text-white">{HYKTEC_BRAND.positioning}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block">Primary Headline:</span>
              <span className="text-hyktec-pink font-semibold">{HYKTEC_BRAND.headline}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block">Contact Email:</span>
              <span className="text-white">{HYKTEC_BRAND.contactEmail}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-400 block">Headquarters:</span>
              <span className="text-white">{HYKTEC_BRAND.address}</span>
            </div>
          </div>
        </div>

        {/* Security & Infrastructure Status */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & Infrastructure
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">Database Engine</span>
              <span className="text-emerald-400 font-mono font-bold">SQLite Relational (Prisma ORM)</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">Password Hashing Algorithm</span>
              <span className="text-emerald-400 font-mono font-bold">Bcrypt (Salt Rounds: 10)</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">Session Protection</span>
              <span className="text-emerald-400 font-mono font-bold">JWT HTTP-Only Cookies</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">RBAC Enforcement</span>
              <span className="text-emerald-400 font-mono font-bold">Strict Server-Side Middleware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

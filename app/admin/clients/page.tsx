import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { UserCheck, Plus, Mail, Phone, Building, Globe, FolderKanban } from 'lucide-react';
import bcrypt from 'bcryptjs';

export const revalidate = 0;

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      user: true,
      projects: true,
      invoices: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Server Action to Create New Client
  async function createClientAction(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;
    const phone = formData.get('phone') as string;
    const country = formData.get('country') as string;
    const website = formData.get('website') as string;

    if (!name || !email || !companyName) return;

    const defaultPassword = await bcrypt.hash('Client2026!', 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: defaultPassword,
        name,
        role: 'client',
        company: companyName,
        phone,
        status: 'active',
      },
    });

    await prisma.client.create({
      data: {
        userId: user.id,
        companyName,
        country,
        website,
      },
    });

    revalidatePath('/admin/clients');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Client Account Management</h1>
        <p className="text-xs text-slate-400">View active client accounts, create new accounts, and monitor assigned project contracts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Client Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-hyktec-pink" /> Create New Client Account
            </h2>

            <form action={createClientAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Acme Global Corp"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@acme.com"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United States"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL</label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://acme.com"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Note: Initial password will be set to <code className="text-hyktec-pink font-mono">Client2026!</code>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
              >
                Create Client & Account
              </button>
            </form>
          </div>
        </div>

        {/* Client List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white">Registered Clients ({clients.length})</h2>

          <div className="space-y-4">
            {clients.map((c) => (
              <div key={c.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{c.companyName}</h3>
                    <div className="text-xs text-slate-400">{c.user.name} • {c.user.email}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">
                    {c.projects.length} Projects
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                  {c.country && <span>Country: {c.country}</span>}
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-hyktec-pink hover:underline">
                      {c.website}
                    </a>
                  )}
                  <span>Invoices: {c.invoices.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

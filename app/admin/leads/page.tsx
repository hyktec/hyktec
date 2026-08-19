import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Users, Mail, Phone, Globe, DollarSign, CheckCircle2, UserPlus, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Server Action to Update Lead Status
  async function updateLeadStatus(formData: FormData) {
    'use server';
    const leadId = formData.get('leadId') as string;
    const status = formData.get('status') as string;
    const notes = formData.get('notes') as string;

    if (!leadId) return;

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        status,
        notes: notes || undefined,
      },
    });

    revalidatePath('/admin/leads');
  }

  // Server Action to Convert Lead to Client
  async function convertLeadToClient(formData: FormData) {
    'use server';
    const leadId = formData.get('leadId') as string;
    if (!leadId) return;

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return;

    // Check if user exists or create
    let user = await prisma.user.findUnique({ where: { email: lead.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: lead.email,
          passwordHash: '$2a$10$wN9P3Y6q6oR4B7uN7mR9.e/4/y/nN5N5N5N5N5N5N5N5N5N5N5N5', // default hashed pass
          name: lead.name,
          role: 'client',
          company: lead.company,
          phone: lead.phone,
          status: 'active',
        },
      });
    }

    const existingClient = await prisma.client.findUnique({ where: { userId: user.id } });
    if (!existingClient) {
      await prisma.client.create({
        data: {
          userId: user.id,
          companyName: lead.company || lead.name,
          country: lead.country,
          website: lead.websiteUrl,
          notes: `Converted from lead (${lead.service}). Brief: ${lead.description}`,
        },
      });
    }

    await prisma.lead.update({
      where: { id: leadId },
      data: { status: 'won' },
    });

    revalidatePath('/admin/leads');
    revalidatePath('/admin/clients');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Lead Management & Pipeline</h1>
        <p className="text-xs text-slate-400">Manage inbound project briefs, update deal stages, and convert leads into active clients.</p>
      </div>

      <div className="space-y-6">
        {leads.map((lead) => (
          <div key={lead.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{lead.name}</h2>
                  {lead.company && <span className="text-xs text-slate-400 font-semibold">• {lead.company}</span>}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-hyktec-pink" /> {lead.email}</span>
                  {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-hyktec-pink" /> {lead.phone}</span>}
                  {lead.country && <span>Country: {lead.country}</span>}
                </div>
              </div>

              {/* Status Update Form */}
              <div className="flex flex-wrap items-center gap-3">
                <form action={updateLeadStatus} className="flex items-center gap-2">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="px-3 py-1.5 rounded-lg bg-navy-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won (Client)</option>
                    <option value="lost">Lost</option>
                  </select>
                  <button type="submit" className="px-3 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg">
                    Update Stage
                  </button>
                </form>

                {lead.status !== 'won' && (
                  <form action={convertLeadToClient}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white gradient-pink-red rounded-lg shadow-md"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Convert to Client
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Brief Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-semibold">Required Service & Budget</div>
                <div className="text-sm font-bold text-hyktec-pink">{lead.service}</div>
                <div className="text-white">Budget: {lead.budget || 'Unspecified'}</div>
                <div className="text-slate-400">Timeline: {lead.expectedTimeline || 'Not specified'}</div>
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-semibold">Project Brief Description</div>
                <p className="text-slate-200 leading-relaxed">{lead.description}</p>
                {lead.notes && (
                  <div className="pt-2 text-hyktec-pink font-semibold border-t border-slate-800 mt-2">
                    Internal Admin Note: {lead.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

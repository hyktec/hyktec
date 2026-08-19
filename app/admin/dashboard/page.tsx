import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Users, FolderKanban, DollarSign, Headphones, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: 'new' } });
  const totalClients = await prisma.client.count();
  const activeProjects = await prisma.project.count({ where: { NOT: { status: 'completed' } } });
  const openTickets = await prisma.ticket.count({ where: { status: { in: ['open', 'in_progress'] } } });

  const invoices = await prisma.invoice.findMany({ where: { status: 'paid' } });
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Hyktec Admin Control Center</h1>
          <p className="text-xs text-slate-400">Enterprise operational metrics, lead pipeline & project analytics.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white gradient-pink-red rounded-lg shadow-md"
          >
            <Users className="w-3.5 h-3.5" /> Manage Lead Pipeline ({newLeads} New)
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Leads</div>
            <div className="text-2xl font-extrabold text-white">{totalLeads}</div>
            <div className="text-[10px] text-hyktec-pink font-semibold">{newLeads} new leads</div>
          </div>
          <div className="p-3 rounded-xl bg-hyktec-pink/20 text-hyktec-pink">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Clients</div>
            <div className="text-2xl font-extrabold text-white">{totalClients}</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Projects</div>
            <div className="text-2xl font-extrabold text-white">{activeProjects}</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Revenue</div>
            <div className="text-2xl font-extrabold text-emerald-400">${totalRevenue.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Open Tickets</div>
            <div className="text-2xl font-extrabold text-white">{openTickets}</div>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400">
            <Headphones className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Leads Pipeline Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Inbound Lead Briefs</h2>
          <Link href="/admin/leads" className="text-xs text-hyktec-pink hover:underline font-semibold flex items-center gap-1">
            View Lead Kanban Pipeline <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                <th className="py-3 px-4">Contact Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">{lead.name}</td>
                  <td className="py-3 px-4 text-slate-300">{lead.company || 'N/A'}</td>
                  <td className="py-3 px-4 font-medium text-hyktec-pink">{lead.service}</td>
                  <td className="py-3 px-4">{lead.budget || 'Custom'}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold uppercase text-slate-300">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

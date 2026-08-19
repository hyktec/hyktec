import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { FolderKanban, Headphones, FileText, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function ClientDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: {
      projects: {
        include: { milestones: true, tasks: true },
      },
      tickets: { orderBy: { createdAt: 'desc' } },
      invoices: { orderBy: { createdAt: 'desc' } },
    },
  });

  const projects = client?.projects || [];
  const tickets = client?.tickets || [];
  const invoices = client?.invoices || [];

  const activeProjectsCount = projects.filter((p) => p.status !== 'completed').length;
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const openTickets = tickets.filter((t) => t.status !== 'closed' && t.status !== 'resolved');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Welcome back, {user.name}</h1>
          <p className="text-xs text-slate-400">
            {client?.companyName || user.company || 'Client Dashboard'} • Project Status Overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/client/tickets?new=true"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white gradient-pink-red rounded-lg shadow-md"
          >
            <Headphones className="w-3.5 h-3.5" />
            Submit Support Ticket
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Active Projects</div>
            <div className="text-2xl font-extrabold text-white">{activeProjectsCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Pending Invoices</div>
            <div className="text-2xl font-extrabold text-white">{pendingInvoices.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Open Support Tickets</div>
            <div className="text-2xl font-extrabold text-white">{openTickets.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-hyktec-pink/20 text-hyktec-pink">
            <Headphones className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Total Tickets</div>
            <div className="text-2xl font-extrabold text-white">{tickets.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Projects Timeline & Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Active Projects & Progress</h2>
          <Link href="/client/projects" className="text-xs text-hyktec-pink hover:underline flex items-center gap-1 font-semibold">
            View All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
            No active projects assigned to your account yet.
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{proj.name}</h3>
                    <div className="text-xs text-slate-400">{proj.serviceType} • Timeline: {proj.startDate || 'Started'} - {proj.endDate || 'Ongoing'}</div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-hyktec-pink/20 text-hyktec-pink text-xs font-bold uppercase tracking-wider w-fit">
                    Status: {proj.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-semibold">
                    <span>Overall Project Completion</span>
                    <span>{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-pink-red transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Tickets & Invoices Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Support Tickets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Support Tickets</h2>
            <Link href="/client/tickets" className="text-xs text-hyktec-pink hover:underline font-semibold">
              Manage Desk
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.slice(0, 3).map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-hyktec-pink font-bold">{t.ticketNum}</div>
                  <div className="text-sm font-semibold text-white">{t.subject}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 capitalize">
                  {t.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Billing Overview</h2>
            <Link href="/client/invoices" className="text-xs text-hyktec-pink hover:underline font-semibold">
              View All Invoices
            </Link>
          </div>

          <div className="space-y-3">
            {invoices.slice(0, 3).map((inv) => (
              <div key={inv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 font-bold">{inv.invoiceNumber}</div>
                  <div className="text-sm font-bold text-white">${inv.amount.toLocaleString()}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                    inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

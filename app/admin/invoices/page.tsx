import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { FileText, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export const revalidate = 0;

export default async function AdminInvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      client: { include: { user: true } },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const clients = await prisma.client.findMany({
    include: { user: true },
  });

  // Server Action to Create Invoice
  async function createInvoiceAction(formData: FormData) {
    'use server';
    const clientId = formData.get('clientId') as string;
    const itemDesc = formData.get('itemDesc') as string;
    const amount = parseFloat(formData.get('amount') as string) || 0;
    const dueDate = formData.get('dueDate') as string;

    if (!clientId || !itemDesc || !amount) return;

    const invoiceNumber = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;

    const inv = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId,
        amount,
        tax: amount * 0.05,
        discount: 0,
        status: 'pending',
        dueDate: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    });

    await prisma.invoiceItem.create({
      data: {
        invoiceId: inv.id,
        description: itemDesc,
        quantity: 1,
        unitPrice: amount,
        amount,
      },
    });

    revalidatePath('/admin/invoices');
  }

  // Server Action to Update Invoice Status
  async function updateInvoiceStatus(formData: FormData) {
    'use server';
    const invoiceId = formData.get('invoiceId') as string;
    const status = formData.get('status') as string;

    if (!invoiceId) return;

    const paidAt = status === 'paid' ? new Date().toISOString().split('T')[0] : null;

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status, paidAt },
    });

    revalidatePath('/admin/invoices');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Billing & Invoice Generator</h1>
        <p className="text-xs text-slate-400">Generate itemized billing invoices, assign client accounts, and track payment receipts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Invoice Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-hyktec-pink" /> Generate Invoice
            </h2>

            <form action={createInvoiceAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Client *</label>
                <select
                  name="clientId"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                >
                  <option value="">Select a client...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.user.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Line Item Description *</label>
                <input
                  type="text"
                  name="itemDesc"
                  required
                  placeholder="Phase 1 Development Milestone Sign-off"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($ USD) *</label>
                  <input
                    type="number"
                    name="amount"
                    required
                    placeholder="9500"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
              >
                Generate & Issue Invoice
              </button>
            </form>
          </div>
        </div>

        {/* Invoice List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white">Issued Invoices ({invoices.length})</h2>

          <div className="space-y-4">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-hyktec-pink font-bold">{inv.invoiceNumber}</span>
                    <h3 className="text-base font-bold text-white">${inv.amount.toLocaleString()}</h3>
                    <div className="text-xs text-slate-400">Client: {inv.client.companyName}</div>
                  </div>

                  <form action={updateInvoiceStatus} className="flex items-center gap-2">
                    <input type="hidden" name="invoiceId" value={inv.id} />
                    <select
                      name="status"
                      defaultValue={inv.status}
                      className="px-2.5 py-1 rounded bg-navy-950 border border-slate-800 text-xs font-extrabold uppercase text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button type="submit" className="px-3 py-1 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg">
                      Save
                    </button>
                  </form>
                </div>

                <div className="text-xs text-slate-300">
                  Line Items: {inv.items.map((i) => i.description).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

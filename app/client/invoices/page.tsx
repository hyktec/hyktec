import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { FileText, Printer, CheckCircle2, AlertCircle } from 'lucide-react';

export const revalidate = 0;

export default async function ClientInvoicesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: {
      invoices: {
        include: { items: true, project: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const invoices = client?.invoices || [];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Billing & Invoices</h1>
        <p className="text-xs text-slate-400">View contract invoices, payment history, and line-item breakdowns.</p>
      </div>

      <div className="space-y-6">
        {invoices.map((inv) => (
          <div key={inv.id} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-hyktec-pink font-bold">{inv.invoiceNumber}</span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  {inv.project?.name || 'Milestone Contract Invoice'}
                </h2>
                <div className="text-xs text-slate-400">
                  Due Date: {inv.dueDate} • {inv.paidAt ? `Paid on ${inv.paidAt}` : 'Awaiting Payment'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    inv.status === 'paid'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  {inv.status}
                </span>

                <button
                  onClick={undefined}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Print Invoice PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-right">Unit Price</th>
                    <th className="py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {inv.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium text-white">{item.description}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">${item.unitPrice.toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-white">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="flex justify-end pt-4 border-t border-slate-800 text-xs">
              <div className="w-64 space-y-1.5 text-right">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>${inv.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax:</span>
                  <span>${inv.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-hyktec-pink">${(inv.amount + inv.tax - inv.discount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

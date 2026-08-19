import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Headphones, Send, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTicketsPage() {
  const tickets = await prisma.ticket.findMany({
    include: {
      client: { include: { user: true } },
      messages: {
        include: { sender: true },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Server Action to Post Admin Reply
  async function adminReplyAction(formData: FormData) {
    'use server';
    const user = await getCurrentUser();
    if (!user) return;

    const ticketId = formData.get('ticketId') as string;
    const message = formData.get('message') as string;
    const status = formData.get('status') as string;

    if (!ticketId || !message) return;

    await prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId: user.id,
        senderType: 'admin',
        message,
      },
    });

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: status || 'in_progress' },
    });

    revalidatePath('/admin/tickets');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Support Ticket Resolution Desk</h1>
        <p className="text-xs text-slate-400">Respond to client tickets, assign priority levels, and close technical requests.</p>
      </div>

      <div className="space-y-6">
        {tickets.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-hyktec-pink font-bold">{t.ticketNum}</span>
                <h2 className="text-lg font-bold text-white">{t.subject}</h2>
                <div className="text-xs text-slate-400">
                  Client: {t.client.companyName} ({t.client.user.name}) • Priority: {t.priority.toUpperCase()}
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-extrabold uppercase text-slate-200">
                Status: {t.status}
              </span>
            </div>

            {/* Messages Thread */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {t.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl text-xs space-y-1 ${
                    msg.senderType === 'admin'
                      ? 'bg-hyktec-pink/10 border border-hyktec-pink/30 ml-4'
                      : 'bg-navy-950 border border-slate-800 mr-4'
                  }`}
                >
                  <div className="flex justify-between font-semibold text-slate-400 text-[10px]">
                    <span>{msg.sender?.name || msg.senderType}</span>
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-white leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Admin Response Form */}
            <form action={adminReplyAction} className="flex gap-2 pt-2 border-t border-slate-800">
              <input type="hidden" name="ticketId" value={t.id} />
              <select
                name="status"
                defaultValue={t.status}
                className="px-2.5 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs font-bold"
              >
                <option value="in_progress">In Progress</option>
                <option value="waiting_client">Waiting for Client</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <input
                type="text"
                name="message"
                required
                placeholder="Type official admin response..."
                className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              />

              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white gradient-pink-red rounded-xl flex items-center gap-1"
              >
                Send Reply <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Headphones, Plus, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function ClientTicketsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: {
      tickets: {
        include: {
          messages: {
            include: { sender: true },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const tickets = client?.tickets || [];

  // Server Action to Create Ticket
  async function createTicketAction(formData: FormData) {
    'use server';
    const currUser = await getCurrentUser();
    if (!currUser) return;

    const currClient = await prisma.client.findFirst({ where: { userId: currUser.id } });
    if (!currClient) return;

    const subject = formData.get('subject') as string;
    const category = formData.get('category') as string;
    const priority = formData.get('priority') as string;
    const message = formData.get('message') as string;

    if (!subject || !message) return;

    const ticketNum = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

    const ticket = await prisma.ticket.create({
      data: {
        ticketNum,
        clientId: currClient.id,
        subject,
        category: category || 'general',
        priority: priority || 'medium',
        status: 'open',
      },
    });

    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        senderId: currUser.id,
        senderType: 'client',
        message,
      },
    });

    revalidatePath('/client/tickets');
  }

  // Server Action to Post Reply
  async function postReplyAction(formData: FormData) {
    'use server';
    const currUser = await getCurrentUser();
    if (!currUser) return;

    const ticketId = formData.get('ticketId') as string;
    const message = formData.get('message') as string;

    if (!ticketId || !message) return;

    await prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId: currUser.id,
        senderType: 'client',
        message,
      },
    });

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: 'open' },
    });

    revalidatePath('/client/tickets');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Support Ticket Desk</h1>
        <p className="text-xs text-slate-400">Submit technical inquiries, bug reports, and maintenance requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Ticket Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-hyktec-pink" /> Create Support Ticket
            </h2>

            <form action={createTicketAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Summary of request..."
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="general">General Support</option>
                    <option value="bug">Bug Report</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="billing">Billing Inquiry</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    name="priority"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent SLA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Provide step-by-step details..."
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Tickets & Thread List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-white">Ticket History & Responses</h2>

          {tickets.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
              No tickets submitted yet.
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((t) => (
                <div key={t.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono text-hyktec-pink font-bold">{t.ticketNum}</span>
                      <h3 className="text-base font-bold text-white">{t.subject}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        t.status === 'open' ? 'bg-hyktec-pink/20 text-hyktec-pink' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {t.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3.5 rounded-xl text-xs space-y-1 ${
                          msg.senderType === 'client'
                            ? 'bg-navy-950 border border-slate-800 ml-4'
                            : 'bg-hyktec-pink/10 border border-hyktec-pink/30 mr-4'
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

                  {/* Reply Action */}
                  <form action={postReplyAction} className="flex gap-2 pt-2 border-t border-slate-800">
                    <input type="hidden" name="ticketId" value={t.id} />
                    <input
                      type="text"
                      name="message"
                      required
                      placeholder="Write a response..."
                      className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white gradient-pink-red rounded-xl flex items-center gap-1"
                    >
                      Reply <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

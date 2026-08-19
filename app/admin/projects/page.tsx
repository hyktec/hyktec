import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { FolderKanban, Plus, CheckCircle2, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      client: { include: { user: true } },
      milestones: true,
      tasks: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const clients = await prisma.client.findMany({
    include: { user: true },
  });

  // Server Action to Create Project
  async function createProjectAction(formData: FormData) {
    'use server';
    const clientId = formData.get('clientId') as string;
    const name = formData.get('name') as string;
    const serviceType = formData.get('serviceType') as string;
    const budget = parseFloat(formData.get('budget') as string) || 0;
    const description = formData.get('description') as string;

    if (!clientId || !name) return;

    await prisma.project.create({
      data: {
        clientId,
        name,
        serviceType: serviceType || 'Web Development',
        budget,
        description,
        status: 'planning',
        progress: 10,
      },
    });

    revalidatePath('/admin/projects');
  }

  // Server Action to Update Progress
  async function updateProgressAction(formData: FormData) {
    'use server';
    const projectId = formData.get('projectId') as string;
    const progress = parseInt(formData.get('progress') as string) || 0;
    const status = formData.get('status') as string;

    if (!projectId) return;

    await prisma.project.update({
      where: { id: projectId },
      data: { progress, status },
    });

    revalidatePath('/admin/projects');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Project & Task Manager</h1>
        <p className="text-xs text-slate-400">Create client project contracts, set milestones, track task completion, and update progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Project Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-hyktec-pink" /> Create New Project
            </h2>

            <form action={createProjectAction} className="space-y-4">
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enterprise SaaS Portal & AI Suite"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Category</label>
                  <select
                    name="serviceType"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Management & Support">Management & Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Budget ($ USD)</label>
                  <input
                    type="number"
                    name="budget"
                    placeholder="25000"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Project goals and technical scope..."
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
              >
                Create Project Contract
              </button>
            </form>
          </div>
        </div>

        {/* Projects List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-white">Active Projects ({projects.length})</h2>

          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                    <div className="text-xs text-slate-400">
                      Client: {p.client.companyName} • Budget: ${p.budget?.toLocaleString() || 'N/A'}
                    </div>
                  </div>

                  <form action={updateProgressAction} className="flex items-center gap-2">
                    <input type="hidden" name="projectId" value={p.id} />
                    <select
                      name="status"
                      defaultValue={p.status}
                      className="px-2 py-1 rounded bg-navy-950 border border-slate-800 text-[11px] text-white font-bold"
                    >
                      <option value="planning">Planning</option>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                      <option value="testing">Testing</option>
                      <option value="review">Review</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>

                    <input
                      type="number"
                      name="progress"
                      defaultValue={p.progress}
                      min={0}
                      max={100}
                      className="w-16 px-2 py-1 rounded bg-navy-950 border border-slate-800 text-[11px] text-white font-mono"
                    />
                    <span className="text-xs font-bold text-white">%</span>

                    <button type="submit" className="px-2.5 py-1 text-[11px] font-bold text-white bg-slate-800 hover:bg-slate-700 rounded">
                      Save
                    </button>
                  </form>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Progress Indicator</span>
                    <span className="text-white font-bold">{p.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full gradient-pink-red" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

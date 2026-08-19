import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { FolderKanban, CheckCircle2, Clock, Calendar, CheckSquare } from 'lucide-react';

export const revalidate = 0;

export default async function ClientProjectsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: {
      projects: {
        include: {
          milestones: true,
          tasks: true,
        },
      },
    },
  });

  const projects = client?.projects || [];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Project Tracker & Milestones</h1>
        <p className="text-xs text-slate-400">Track progress, milestones, and task deliverables for your active contracts.</p>
      </div>

      <div className="space-y-8">
        {projects.map((proj) => (
          <div key={proj.id} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-hyktec-pink/20 text-hyktec-pink text-[11px] font-bold uppercase tracking-wider">
                  {proj.serviceType}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{proj.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{proj.description}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Overall Progress</div>
                <div className="text-3xl font-extrabold text-white">{proj.progress}%</div>
              </div>
            </div>

            {/* Milestones List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hyktec-pink" />
                Project Milestones
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proj.milestones.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{m.title}</span>
                      {m.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">Due: {m.dueDate || 'TBD'}</div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        m.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : m.status === 'in_progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverable Tasks */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-hyktec-pink" />
                Development Tasks & Status
              </h3>

              <div className="space-y-2">
                {proj.tasks.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          task.status === 'done' ? 'bg-emerald-500' : task.status === 'in_progress' ? 'bg-blue-500' : 'bg-slate-600'
                        }`}
                      />
                      <span className="font-semibold text-white">{task.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase font-bold">
                        {task.priority} Priority
                      </span>
                      <span className="text-slate-400 uppercase font-mono">{task.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

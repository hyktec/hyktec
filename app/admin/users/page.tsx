import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ShieldCheck, UserPlus, Lock } from 'lucide-react';
import bcrypt from 'bcryptjs';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Server Action to Create Team User
  async function createTeamUserAction(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !role || !password) return;

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
        company: 'HYKTEC',
        status: 'active',
      },
    });

    revalidatePath('/admin/users');
  }

  // Server Action to Update Role
  async function updateUserRoleAction(formData: FormData) {
    'use server';
    const userId = formData.get('userId') as string;
    const role = formData.get('role') as string;
    const status = formData.get('status') as string;

    if (!userId) return;

    await prisma.user.update({
      where: { id: userId },
      data: { role, status },
    });

    revalidatePath('/admin/users');
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">User & Role Permission Management</h1>
        <p className="text-xs text-slate-400">Configure Role-Based Access Control (RBAC) across Super Admin, Admin, Manager, Developer, Marketing, Support, and Client roles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-hyktec-pink" /> Add Team Member / User
            </h2>

            <form action={createTeamUserAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Alex Mercer"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@hyktec.com"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Role *</label>
                  <select
                    name="role"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink font-bold"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                    <option value="marketing">Marketing</option>
                    <option value="support">Support</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
              >
                Provision User & Set RBAC
              </button>
            </form>
          </div>
        </div>

        {/* User Table */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white">System Accounts ({users.length})</h2>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {u.name}
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-hyktec-pink uppercase font-extrabold">
                      {u.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{u.email} • Status: {u.status}</div>
                </div>

                <form action={updateUserRoleAction} className="flex items-center gap-2">
                  <input type="hidden" name="userId" value={u.id} />
                  <select
                    name="role"
                    defaultValue={u.role}
                    className="px-2 py-1 rounded bg-navy-950 border border-slate-800 text-xs text-white font-semibold"
                  >
                    <option value="super_admin">super_admin</option>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                    <option value="developer">developer</option>
                    <option value="marketing">marketing</option>
                    <option value="support">support</option>
                    <option value="client">client</option>
                  </select>

                  <select
                    name="status"
                    defaultValue={u.status}
                    className="px-2 py-1 rounded bg-navy-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>

                  <button type="submit" className="px-2.5 py-1 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded">
                    Save
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

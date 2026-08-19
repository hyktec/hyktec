import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { HyktecLogo } from '@/components/brand/HyktecLogo';
import {
  LayoutDashboard,
  FolderKanban,
  Headphones,
  FileText,
  FolderDown,
  LogOut,
  User,
  ShieldAlert
} from 'lucide-react';

export const revalidate = 0;

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Client isolation check
  if (user.role !== 'client' && user.role !== 'super_admin') {
    // If team member logs in, redirect to admin
    redirect('/admin/dashboard');
  }

  const clientNav = [
    { name: 'Overview', href: '/client/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/client/projects', icon: FolderKanban },
    { name: 'Support Tickets', href: '/client/tickets', icon: Headphones },
    { name: 'Billing & Invoices', href: '/client/invoices', icon: FileText },
    { name: 'Documents', href: '/client/documents', icon: FolderDown },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/client/dashboard">
              <HyktecLogo theme="dark" size="sm" showTagline={false} />
            </Link>
            <span className="px-2 py-0.5 rounded bg-hyktec-pink/20 text-hyktec-pink text-[10px] font-extrabold uppercase">
              Client Portal
            </span>
          </div>

          <nav className="space-y-1.5">
            {clientNav.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <IconComp className="w-4 h-4 text-hyktec-pink" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-hyktec-pink text-white font-bold flex items-center justify-center text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.company || user.email}</div>
            </div>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}

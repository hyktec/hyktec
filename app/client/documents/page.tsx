import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { FolderDown, FileText, Download, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function ClientDocumentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const client = await prisma.client.findFirst({
    where: { userId: user.id },
    include: {
      documents: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const docs = client?.documents || [];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Document Repository</h1>
        <p className="text-xs text-slate-400">Access contracts, signed proposals, technical specifications, and project deliverables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <div key={doc.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-hyktec-pink/20 text-hyktec-pink flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 uppercase">
                  {doc.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 break-words">{doc.title}</h3>
                <div className="text-[11px] text-slate-400 mt-1">Size: {doc.fileSize || 'Unknown'}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href={doc.fileUrl}
                download
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download File
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

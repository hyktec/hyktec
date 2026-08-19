import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, Award } from 'lucide-react';

export const revalidate = 0;

interface CaseStudyProps {
  params: { slug: string };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyProps) {
  const project = await prisma.portfolioProject.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    notFound();
  }

  let techList: string[] = [];
  try {
    techList = JSON.parse(project.technologiesJson || '[]');
  } catch {
    techList = [];
  }

  return (
    <div className="space-y-16 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <div className="pt-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-hyktec-pink transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      {/* Case Study Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-semibold text-hyktec-pink uppercase tracking-widest">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.industry}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{project.title}</h1>
        <div className="text-sm text-slate-300 font-medium">Client: {project.clientName}</div>
      </section>

      {/* Featured Image */}
      {project.featuredImage && (
        <div className="rounded-3xl overflow-hidden border border-slate-800 h-96 bg-slate-900">
          <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Case Study Grid (Challenge -> Strategy -> Solution -> Tech -> Result) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              The Challenge
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{project.challenge}</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hyktec-pink" />
              Our Technical Solution & Strategy
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </div>

          <div className="p-8 rounded-2xl gradient-pink-red p-8 text-white space-y-3 shadow-xl">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              Measurable Business Result
            </h2>
            <p className="text-white/95 text-base font-semibold leading-relaxed">{project.result}</p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {techList.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-hyktec-pink border border-slate-700">
                  {t}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Visit Live Project <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArrowRight, ExternalLink, Tag } from 'lucide-react';

export const revalidate = 0;

export default async function PortfolioPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.portfolioProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    projects = [];
  }

  const categories = ['All', 'Websites', 'Mobile Apps', 'Web Applications', 'AI', 'Digital Marketing', 'E-commerce'];

  return (
    <div className="space-y-16 pb-16">
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Case Studies & Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Our Proven Results</h1>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          Explore real case studies of digital applications, mobile products, and AI solutions we’ve engineered for clients worldwide.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => {
            let techList: string[] = [];
            try {
              techList = JSON.parse(proj.technologiesJson || '[]');
            } catch {
              techList = [];
            }

            return (
              <div
                key={proj.id}
                className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-hyktec-pink/50 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="h-48 bg-slate-800 relative overflow-hidden">
                    {proj.featuredImage ? (
                      <img
                        src={proj.featuredImage}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                        HYKTEC CASE STUDY
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-[11px] font-bold text-hyktec-pink border border-slate-700">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-slate-400 font-semibold">{proj.clientName} • {proj.industry}</div>
                    <h3 className="text-xl font-bold text-white group-hover:text-hyktec-pink transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {proj.solution}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {techList.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                  <Link
                    href={`/portfolio/${proj.slug}`}
                    className="text-xs font-bold text-hyktec-pink hover:underline flex items-center gap-1"
                  >
                    Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="Visit Live URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

export const revalidate = 0;

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
  } catch (e) {
    posts = [];
  }

  return (
    <div className="space-y-16 pb-16">
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <span>Hyktec Tech Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Engineering & Business Growth Blog</h1>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
          Technical articles, AI automation deep-dives, mobile development guides, and B2B growth strategies from the Hyktec team.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-hyktec-pink/50 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
          >
            <div>
              {post.featuredImage && (
                <div className="h-48 bg-slate-800 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] font-semibold text-hyktec-pink uppercase">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-hyktec-pink transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">{post.author}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-hyktec-pink hover:underline flex items-center gap-1"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

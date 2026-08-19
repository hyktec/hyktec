import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export const revalidate = 0;

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <div className="space-y-12 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-hyktec-pink transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      <header className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-hyktec-pink uppercase tracking-wider">
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{post.title}</h1>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-4">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}</span>
        </div>
      </header>

      {post.featuredImage && (
        <div className="rounded-3xl overflow-hidden border border-slate-800 h-96 bg-slate-900">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-hyktec-pink">
        <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-sm sm:text-base">
          {post.content}
        </div>
      </article>
    </div>
  );
}

import React from 'react';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { FileCode, Plus, CheckCircle2, Edit3, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCMSPage() {
  const blogPosts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  const pricingPlans = await prisma.pricingPlan.findMany({ orderBy: { sortOrder: 'asc' } });
  const portfolioProjects = await prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' } });

  // Server Action to Create Blog Post
  async function createBlogPostAction(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;

    if (!title || !content) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    await prisma.blogPost.create({
      data: {
        title,
        slug,
        category: category || 'Technology',
        excerpt: excerpt || title,
        content,
        status: 'published',
      },
    });

    revalidatePath('/admin/cms');
    revalidatePath('/blog');
  }

  // Server Action to Add Pricing Plan
  async function addPricingPlanAction(formData: FormData) {
    'use server';
    const category = formData.get('category') as string;
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const period = formData.get('period') as string;
    const featuresRaw = formData.get('features') as string;

    if (!name || !price) return;

    const featuresList = featuresRaw ? featuresRaw.split('\n').filter(Boolean) : [];

    await prisma.pricingPlan.create({
      data: {
        category: category || 'Website',
        name,
        price,
        period: period || 'one-time',
        featuresJson: JSON.stringify(featuresList),
      },
    });

    revalidatePath('/admin/cms');
    revalidatePath('/pricing');
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Content Management System (CMS)</h1>
        <p className="text-xs text-slate-400">Update public website content, publish blog articles, manage pricing packages, and portfolio case studies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blog CMS */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-hyktec-pink" /> Publish Blog Article
          </h2>

          <form action={createBlogPostAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="How AI Agents Transform Operations in 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                name="category"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              >
                <option value="AI Solutions">AI Solutions</option>
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Business Growth">Business Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Excerpt</label>
              <input
                type="text"
                name="excerpt"
                placeholder="Brief 1-2 sentence preview summary..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Article Content (Markdown supported) *</label>
              <textarea
                name="content"
                required
                rows={6}
                placeholder="# Article Heading&#10;&#10;Write technical content here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
            >
              Publish Article
            </button>
          </form>

          {/* List of Published Articles */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold text-white">Published Articles ({blogPosts.length})</div>
            {blogPosts.map((post) => (
              <div key={post.id} className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between text-xs">
                <span className="font-semibold text-white truncate max-w-xs">{post.title}</span>
                <span className="text-hyktec-pink font-mono uppercase">{post.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans CMS */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-hyktec-pink" /> Add / Edit Pricing Package
          </h2>

          <form action={addPricingPlanAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  name="category"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                >
                  <option value="Website">Website</option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="AI Solutions">AI Solutions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Plan Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Professional"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Price *</label>
                <input
                  type="text"
                  name="price"
                  required
                  placeholder="$3,499"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Billing Period</label>
                <input
                  type="text"
                  name="period"
                  placeholder="one-time or /month"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Features (One feature per line)</label>
              <textarea
                name="features"
                rows={4}
                placeholder="Custom Responsive Design&#10;Headless CMS Integration&#10;Full SEO Optimization"
                className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-hyktec-pink"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all"
            >
              Save Pricing Package
            </button>
          </form>

          {/* Active Pricing Plans */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold text-white">Active Pricing Packages ({pricingPlans.length})</div>
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white">{plan.name}</span> ({plan.category})
                </div>
                <span className="font-extrabold text-hyktec-pink">{plan.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Cpu, Zap, CheckCircle2, MessageSquare, Database, Sparkles } from 'lucide-react';

export default function AISolutionsServicePage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Bot className="w-3.5 h-3.5" />
          <span>AI & Workflow Automation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          AI Solutions Engineered for Business Operations
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Deploy intelligent AI chatbots, autonomous workflow agents, custom fine-tuned LLMs, and automated customer support engines tailored to your data.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=ai-solutions"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Build Your AI Solution <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center">AI & Automation Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <MessageSquare className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Intelligent AI Chatbots</h3>
            <p className="text-xs text-slate-400 leading-relaxed">24/7 client assistant trained on internal docs, FAQs, and product catalogs with natural multi-turn conversations.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Bot className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Autonomous AI Agents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Multi-step action agents that perform system tasks, update records, process invoices, and send proactive alerts.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Zap className="w-8 h-8 text-hyktec-pink" />
            <h3 className="text-xl font-bold text-white">Workflow Automation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Connect legacy CRMs, ERPs, and messaging channels to eliminate manual data entry completely.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

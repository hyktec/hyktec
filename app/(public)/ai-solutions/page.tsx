import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Cpu, MessageSquare, Zap, FileText, Headphones, BarChart3, Code, Sparkles } from 'lucide-react';

export default function AISolutionsShowcasePage() {
  const aiFeatures = [
    { title: 'AI Chatbots', desc: 'Custom conversational bots integrated into websites & mobile apps.', icon: MessageSquare },
    { title: 'Autonomous AI Agents', desc: 'Multi-step action agents executing complex operational tasks automatically.', icon: Bot },
    { title: 'Workflow Automation', desc: 'Seamlessly link CRMs, databases, and third-party tools.', icon: Zap },
    { title: 'Business Process Automation', desc: 'Eliminate repetitive manual document and data handling.', icon: Cpu },
    { title: 'AI Content Systems', desc: 'Automated article, copy, and marketing material generation.', icon: FileText },
    { title: 'AI Customer Support Desk', desc: 'Instant 24/7 ticket resolution with human fallback triggers.', icon: Headphones },
    { title: 'AI Data Analysis & Insights', desc: 'Extract predictive patterns and trends from structured & unstructured data.', icon: BarChart3 },
    { title: 'Custom AI Applications', desc: 'Bespoke AI platforms fine-tuned for proprietary domain datasets.', icon: Sparkles },
    { title: 'AI API Integrations', desc: 'Connect OpenAI, Anthropic, and open-source models directly into your backend.', icon: Code },
  ];

  return (
    <div className="space-y-20 pb-16">
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Bot className="w-3.5 h-3.5" />
          <span>AI Solutions & Automation</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
          AI That Works For Your Business.
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Unlock game-changing efficiency and scalability with AI agents, chatbots, intelligent workflows, and custom data processing engines.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=ai-solutions"
            className="flex items-center gap-2 px-8 py-4 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Build Your AI Solution <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiFeatures.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-hyktec-pink/50 space-y-4 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-hyktec-pink/20 text-hyktec-pink flex items-center justify-center">
                <IconComp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

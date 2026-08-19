'use client';

import React from 'react';
import Link from 'next/link';
import {
  HYKTEC_BRAND,
  CORE_SERVICES,
  HYKTEC_PROCESS,
  HYKTEC_WHY_US
} from '@/lib/constants';
import {
  ArrowRight,
  TrendingUp,
  Smartphone,
  Globe,
  Cpu,
  ShieldCheck,
  Zap,
  Target,
  Bot,
  Layers,
  Headphones,
  Handshake,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Award,
  Users
} from 'lucide-react';

export default function HomePage() {
  const iconMap: Record<string, React.ElementType> = {
    TrendingUp,
    Smartphone,
    Globe,
    Cpu,
    ShieldCheck,
    Target,
    Zap,
    Bot,
    Layers,
    Headphones,
    Handshake,
  };

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hyktec-pink/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-hyktec-pink">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HYKTEC — {HYKTEC_BRAND.positioning}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              We Build. We Market. <br />
              <span className="gradient-text">We Automate. You Grow.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {HYKTEC_BRAND.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/start-project"
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 hover:scale-[1.02] transition-all w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 rounded-xl hover:bg-slate-800 transition-all w-full sm:w-auto"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-extrabold text-white">100+</div>
                <div className="text-xs text-slate-400">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">99.9%</div>
                <div className="text-xs text-slate-400">System Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-hyktec-pink">10x</div>
                <div className="text-xs text-slate-400">ROI Automation</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-navy-900 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
                {/* Tech Dashboard Graphic Card */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">hyktec-engine-v2.6</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-hyktec-pink/20 text-hyktec-pink">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">AI Automation Agent</div>
                        <div className="text-xs text-slate-400">Active Workflow: Active</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Running</span>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Cross-Platform App API</div>
                        <div className="text-xs text-slate-400">Latency: 14ms</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">Connected</span>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Growth & Lead Funnel</div>
                        <div className="text-xs text-slate-400">Conversions: +184%</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO (SERVICES OVERVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-hyktec-pink">Core Capabilities</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What We Do</h2>
          <p className="text-slate-400 text-base">
            End-to-end digital engineering and growth solutions built for modern market leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((srv) => {
            const IconComponent = iconMap[srv.iconName] || Globe;
            return (
              <div
                key={srv.id}
                className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-8 hover:border-hyktec-pink/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-hyktec-pink flex items-center justify-center group-hover:bg-hyktec-pink group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-hyktec-pink transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {srv.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-hyktec-pink shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-hyktec-pink transition-colors"
                  >
                    Explore {srv.title}
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Start Project Custom Service Card */}
          <div className="rounded-2xl gradient-pink-red p-8 text-white flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold">Custom Digital Solution?</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Have a unique vision or complex enterprise project? We build custom technology solutions tailored specifically to your goals.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-navy-950 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                Start Your Custom Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY HYKTEC */}
      <section className="bg-slate-900/40 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-hyktec-pink">The Hyktec Advantage</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose Hyktec</h2>
            <p className="text-slate-400 text-base">
              We combine enterprise technical precision with agile execution to accelerate your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HYKTEC_WHY_US.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Target;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-slate-800 text-hyktec-pink shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-hyktec-pink">Structured Workflow</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our 7-Step Process</h2>
          <p className="text-slate-400 text-base">
            From initial concept to deployment and long-term scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HYKTEC_PROCESS.map((p) => (
            <div
              key={p.step}
              className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="text-3xl font-extrabold text-hyktec-pink font-mono">{p.step}</div>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI SHOWCASE PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 border border-hyktec-pink/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-hyktec-pink/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hyktec-pink/20 text-hyktec-pink text-xs font-bold">
                <Bot className="w-3.5 h-3.5" />
                AI Solutions & Automation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                AI That Works For Your Business
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Empower your business with intelligent chatbots, autonomous workflow agents, and custom AI API integrations that reduce operational overhead and elevate customer satisfaction.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <Link
                href="/ai-solutions"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white gradient-pink-red rounded-xl shadow-lg hover:shadow-hyktec-pink/30 transition-all text-center"
              >
                Explore AI Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start-project?service=ai-solutions"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl transition-all text-center"
              >
                Build Your AI Solution
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-12 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Build, Market & Automate Your Business?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Partner with Hyktec to transform your technology vision into a high-performance digital asset.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 hover:scale-105 transition-all w-full sm:w-auto"
            >
              Start Your Project Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-300 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition-all w-full sm:w-auto"
            >
              Talk to Hyktec Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

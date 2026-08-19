import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Smartphone, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function AppDevelopmentPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-hyktec-pink">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Powerful Native & Cross-Platform Mobile Applications
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Build sleek, robust iOS and Android mobile apps engineered with Flutter, React Native, Kotlin, and Swift for real-world user engagement.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/start-project?service=app-development"
            className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white gradient-pink-red rounded-xl shadow-xl hover:shadow-hyktec-pink/30 transition-all"
          >
            Build Your Mobile App <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* App Mockup Visual & Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Full-Lifecycle App Development</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            From initial wireframing and interactive UI prototypes to backend microservices, offline synchronization, payment gateways, and App Store / Google Play store publishing.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Layers className="w-5 h-5 text-hyktec-pink shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Cross-Platform Efficiency</div>
                <div className="text-xs text-slate-400">Single codebase for iOS & Android reducing development costs by 40%.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-hyktec-pink shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Bank-Grade Mobile Security</div>
                <div className="text-xs text-slate-400">Encrypted local storage, biometric auth, and secure token refresh cycles.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div className="w-72 h-[500px] rounded-[40px] bg-slate-900 border-4 border-slate-700 p-4 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="w-32 h-5 bg-slate-800 rounded-full mx-auto mb-4" />
            <div className="space-y-3 flex-1">
              <div className="p-3 rounded-2xl bg-slate-800 text-xs text-white">
                <div className="font-bold">Active User Session</div>
                <div className="text-[10px] text-emerald-400">Sync status: Online</div>
              </div>
              <div className="h-32 rounded-2xl bg-gradient-to-br from-hyktec-pink/30 to-blue-600/20 border border-slate-700 p-3 flex flex-col justify-end">
                <div className="text-xs font-bold text-white">Hyktec Mobile Core</div>
                <div className="text-[10px] text-slate-300">60 FPS Smooth UI</div>
              </div>
            </div>
            <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}

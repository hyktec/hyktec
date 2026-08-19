import React from 'react';
import Link from 'next/link';
import { HyktecLogo } from '../brand/HyktecLogo';
import { HYKTEC_BRAND } from '@/lib/constants';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <HyktecLogo theme="dark" size="lg" showTagline={true} />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed mt-3">
              {HYKTEC_BRAND.subheadline}
            </p>
            <div className="text-xs font-semibold text-hyktec-pink uppercase tracking-widest">
              {HYKTEC_BRAND.philosophy}
            </div>

            {/* Contact Details */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-hyktec-pink" />
                <a href={`mailto:${HYKTEC_BRAND.contactEmail}`} className="hover:text-white transition-colors">
                  {HYKTEC_BRAND.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-hyktec-pink" />
                <span>{HYKTEC_BRAND.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-hyktec-pink shrink-0 mt-0.5" />
                <span>{HYKTEC_BRAND.address}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-hyktec-pink transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-hyktec-pink transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-hyktec-pink transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-hyktec-pink transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-hyktec-pink transition-colors">About Hyktec</Link></li>
              <li><Link href="/portfolio" className="hover:text-hyktec-pink transition-colors">Case Studies & Portfolio</Link></li>
              <li><Link href="/industries" className="hover:text-hyktec-pink transition-colors">Industries We Serve</Link></li>
              <li><Link href="/pricing" className="hover:text-hyktec-pink transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/contact" className="hover:text-hyktec-pink transition-colors">Contact Us</Link></li>
              <li><Link href="/start-project" className="text-hyktec-pink font-medium hover:underline flex items-center gap-1">Start a Project <ArrowRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/digital-marketing" className="hover:text-hyktec-pink transition-colors">Digital Marketing</Link></li>
              <li><Link href="/services/app-development" className="hover:text-hyktec-pink transition-colors">App Development</Link></li>
              <li><Link href="/services/web-development" className="hover:text-hyktec-pink transition-colors">Web Development</Link></li>
              <li><Link href="/services/ai-solutions" className="hover:text-hyktec-pink transition-colors">AI Solutions & Automation</Link></li>
              <li><Link href="/services/management-support" className="hover:text-hyktec-pink transition-colors">Management & Support</Link></li>
              <li><Link href="/solutions" className="hover:text-hyktec-pink transition-colors">Enterprise Solutions</Link></li>
            </ul>
          </div>

          {/* Resources & Portal Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Client Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="hover:text-hyktec-pink transition-colors">Client Login</Link></li>
              <li><Link href="/client/dashboard" className="hover:text-hyktec-pink transition-colors">Project Dashboard</Link></li>
              <li><Link href="/client/tickets" className="hover:text-hyktec-pink transition-colors">Support Desk</Link></li>
              <li><Link href="/technology" className="hover:text-hyktec-pink transition-colors">Technology Stack</Link></li>
              <li><Link href="/blog" className="hover:text-hyktec-pink transition-colors">Insights & Blog</Link></li>
              <li><Link href="/admin/dashboard" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Admin Gateway</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} HYKTEC. All rights reserved. We Build. We Market. We Automate. You Grow.
          </div>
          <div className="flex flex-wrap gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

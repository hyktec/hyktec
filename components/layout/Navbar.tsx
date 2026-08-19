'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HyktecLogo } from '../brand/HyktecLogo';
import {
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Smartphone,
  Globe,
  Cpu,
  ShieldCheck,
  User,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    { name: 'Digital Marketing', href: '/services/digital-marketing', desc: 'Data-driven growth strategies', icon: TrendingUp },
    { name: 'App Development', href: '/services/app-development', desc: 'iOS & Android mobile apps', icon: Smartphone },
    { name: 'Web Development', href: '/services/web-development', desc: 'Fast, scalable web applications', icon: Globe },
    { name: 'AI Solutions & Automation', href: '/services/ai-solutions', desc: 'Custom AI agents & chatbots', icon: Cpu },
    { name: 'Management & Support', href: '/services/management-support', desc: '24/7 technical maintenance', icon: ShieldCheck },
  ];

  const mainNav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', isDropdown: true },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Industries', href: '/industries' },
    { name: 'Technology', href: '/technology' },
    { name: 'AI Showcase', href: '/ai-solutions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <HyktecLogo theme="dark" size="md" showTagline={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {mainNav.map((item) => (
              <div key={item.name} className="relative group">
                {item.isDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:text-hyktec-pink ${
                        pathname.startsWith('/services') ? 'text-hyktec-pink font-semibold' : 'text-slate-300'
                      }`}
                    >
                      Services
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50">
                        <div className="bg-navy-900 border border-slate-800 rounded-xl p-3 shadow-2xl backdrop-blur-xl">
                          {serviceItems.map((sub) => {
                            const Icon = sub.icon;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/60 transition-colors group/sub"
                              >
                                <div className="p-2 rounded-lg bg-slate-800/80 text-hyktec-pink group-hover/sub:bg-hyktec-pink group-hover/sub:text-white transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover/sub:text-hyktec-pink transition-colors">
                                    {sub.name}
                                  </div>
                                  <div className="text-xs text-slate-400">{sub.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:text-hyktec-pink ${
                      pathname === item.href ? 'text-hyktec-pink font-semibold' : 'text-slate-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-500 rounded-lg transition-all"
            >
              <User className="w-3.5 h-3.5" />
              Client Login
            </Link>

            <Link
              href="/start-project"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white gradient-pink-red rounded-lg shadow-lg hover:shadow-hyktec-pink/30 hover:opacity-95 transition-all transform hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/login"
              className="p-2 text-slate-300 hover:text-white border border-slate-800 rounded-lg"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white border border-slate-800 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-navy-950/95 backdrop-blur-2xl border-b border-slate-800 p-5 shadow-2xl z-40 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            {mainNav.map((item) => (
              <div key={item.name}>
                {item.isDropdown ? (
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-hyktec-pink pt-2">Services</div>
                    {serviceItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 pl-3 py-1.5 text-sm text-slate-300 hover:text-white"
                      >
                        <sub.icon className="w-4 h-4 text-hyktec-pink" />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-slate-200 hover:text-hyktec-pink"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-2">
              <Link
                href="/start-project"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white gradient-pink-red rounded-lg shadow-lg"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
              >
                <User className="w-4 h-4" />
                Client Login / Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

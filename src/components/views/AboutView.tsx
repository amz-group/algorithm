import React from 'react';
import {
  Globe,
  ExternalLink,
  Code2,
  Laptop,
  Layers,
  Smartphone,
  Sparkles,
  ShoppingBag,
  Palette,
  Mail,
  UserCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { KrdLogo } from '../common/KrdLogo';

export const AboutView: React.FC = () => {
  const services = [
    {
      icon: Code2,
      title: 'Software & Web Development',
      desc: 'Developing high-performance, responsive corporate websites, web applications, and scalable digital platforms built with modern technology stacks.'
    },
    {
      icon: Laptop,
      title: 'Desktop & Cross-Platform Apps',
      desc: 'Creating powerful, intuitive software solutions like the multilingual KRD CV Builder (supporting Kurdish, Arabic, and English on Windows).'
    },
    {
      icon: ShoppingBag,
      title: 'POS & Business Systems',
      desc: 'Designing fast, reliable Point of Sale (POS) and inventory management systems tailored for retail, business operations, and enterprise workflows.'
    },
    {
      icon: Palette,
      title: 'UI/UX & Product Design',
      desc: 'Crafting clean, accessible, and user-centered interface designs with minimalist aesthetics and seamless user journeys.'
    }
  ];

  const products = [
    {
      name: 'KRD ALGORITHM',
      category: 'Computer Science Education',
      badge: 'Current App',
      description: 'Interactive algorithm analyzer, real-time visualization workspace, and 5-language source code reference for 10 foundational computer science algorithms.'
    },
    {
      name: 'KRD CV BUILDER',
      category: 'Productivity Application',
      badge: 'Multilingual Windows App',
      description: 'Professional CV and resume creation software with multi-language support (Kurdish, Arabic, and English), custom templates, and instant PDF generation.'
    },
    {
      name: 'KRD POS Systems',
      category: 'Enterprise Solution',
      badge: 'Retail & Commercial',
      description: 'Point of sale management system with real-time barcode processing, automated sales reporting, and multi-currency billing.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E5DF] dark:border-[#282828] shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C542]/15 text-[#9E7307] dark:text-[#F5C542] text-xs font-bold border border-[#F5C542]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>KRD GROUP • Technology & Software</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] dark:text-[#FAFAFA]">
            About KRD Group
          </h1>

          <p className="text-sm text-[#666666] dark:text-[#A3A3A3] leading-relaxed">
            KRD Group is a technology and software development team focused on engineering modern websites, custom desktop and web applications, POS systems, and interactive educational tools.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.krdgroup.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5C542] hover:bg-[#e8b634] text-[#111111] font-bold text-xs shadow-xs transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Visit www.krdgroup.dev</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href="mailto:contact@krdgroup.dev"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2F2ED] dark:bg-[#262626] hover:bg-[#EBEBE6] dark:hover:bg-[#303030] text-[#171717] dark:text-[#FAFAFA] font-semibold text-xs border border-[#E0E0DB] dark:border-[#333333] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span>contact@krdgroup.dev</span>
            </a>
          </div>
        </div>

        {/* Official Brand Logo Card */}
        <div className="shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-[#0D0D0D] border border-[#D4A72C]/40 p-3 shadow-md flex items-center justify-center">
          <KrdLogo variant="full" className="w-full h-full" />
        </div>
      </div>

      {/* Founder Spotlight Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E5E5DF] dark:border-[#282828] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0EB] dark:border-[#262626]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E0A820] via-[#F5C542] to-[#FFE685] text-[#111111] flex items-center justify-center font-extrabold text-lg font-mono shadow-xs">
              MB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111111] dark:text-[#FAFAFA]">
                  Mohammed Barzan Ali
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F5C542]/20 text-[#8C6B13] dark:text-[#F5C542]">
                  Founder & Developer
                </span>
              </div>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
                Lead Software Engineer, UI/UX Designer & Creator of KRD Group Ecosystem
              </p>
            </div>
          </div>

          <a
            href="https://www.krdgroup.dev"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#8C6B13] dark:text-[#F5C542] hover:underline flex items-center gap-1"
          >
            <span>krdgroup.dev</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#CCCCCC] leading-relaxed pt-4">
          Mohammed Barzan Ali leads the architecture, full-stack software development, and UI/UX design at KRD Group. With a strong passion for empowering students, businesses, and developers, he has engineered diverse applications ranging from desktop productivity tools to high-throughput web systems and algorithmic visualizers.
        </p>
      </div>

      {/* Core Services / Capabilities */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 bg-[#F5C542] rounded-xs" />
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#FAFAFA]">
            Core Services & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E5E5DF] dark:border-[#282828] shadow-xs space-y-2 hover:border-[#D4A72C] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F5C542]/15 text-[#D4A72C] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#111111] dark:text-[#FAFAFA]">
                  {svc.title}
                </h3>
                <p className="text-xs text-[#666666] dark:text-[#A3A3A3] leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Projects & Products */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 bg-[#F5C542] rounded-xs" />
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#FAFAFA]">
            Featured Digital Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((prod, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E5E5DF] dark:border-[#282828] shadow-xs flex flex-col justify-between space-y-3 hover:border-[#D4A72C] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F2F2ED] dark:bg-[#252525] text-[#737373] dark:text-[#A3A3A3]">
                    {prod.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#B88714] dark:text-[#F5C542]">
                    {prod.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111111] dark:text-[#FAFAFA]">
                  {prod.name}
                </h3>

                <p className="text-xs text-[#525252] dark:text-[#CCCCCC] leading-relaxed">
                  {prod.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Footnote Card */}
      <div className="p-4 rounded-xl bg-[#F7F7F4] dark:bg-[#141414] border border-[#E5E5DF] dark:border-[#262626] text-xs text-[#737373] dark:text-[#888888] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>
          © {new Date().getFullYear()} KRD Group. All rights reserved. Official portal: <a href="https://www.krdgroup.dev" target="_blank" rel="noreferrer" className="text-[#B88714] dark:text-[#F5C542] underline font-medium">www.krdgroup.dev</a>
        </span>
        <span className="font-mono text-[11px] text-[#A3A3A3]">
          KRD ALGORITHM Lab Edition
        </span>
      </div>
    </div>
  );
};

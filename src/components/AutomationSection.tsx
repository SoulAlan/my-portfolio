'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Brain, CalendarClock, GitBranch, KeyRound, Plug, Webhook, Workflow } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries';
import type { Locale } from '@/content/site';

interface AutomationSectionProps {
  locale: Locale;
  t: Dictionary['automation'];
  isDarkMode: boolean;
}

// One icon per card, in the same order as the dictionary items.
const icons = [Workflow, Brain, Bot, KeyRound, Webhook, GitBranch, CalendarClock, Plug];

const AutomationSection: React.FC<AutomationSectionProps> = ({ locale, t, isDarkMode }) => (
  <section id="automation" className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
          <Workflow size={18} className="text-orange-400" aria-hidden />
          <span className="text-orange-400 font-medium text-sm">{t.eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.intro}</p>
      </div>

      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.items.map((item, i) => {
          const Icon = icons[i] ?? Workflow;
          return (
            <li key={item.title}>
              <Link
                href={`/${locale}/projects/${item.project}`}
                className={`group flex flex-col h-full p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${isDarkMode
                  ? 'bg-gray-800/70 border-gray-700 hover:border-orange-500/60'
                  : 'bg-gray-50 border-gray-200 hover:border-orange-500/60 shadow-sm hover:shadow-lg'}`}
              >
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                  <Icon size={20} className="text-white" aria-hidden />
                </span>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 group-hover:gap-2.5 transition-all">
                  {t.seeCaseStudy}
                  <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default AutomationSection;

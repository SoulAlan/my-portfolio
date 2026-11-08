'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, ChevronDown, Code, Cpu, Github, Languages, Linkedin, Lock, Mail, MapPin, Moon, Server, Sun, Users, Zap } from 'lucide-react';
import AIAcceleratedSection from '@/components/AIAcceleratedSection';
import AutomationSection from '@/components/AutomationSection';
import ContactSection from '@/components/ContactSection';
import TimeZonePanel from '@/components/TimeZonePanel';
import type { BadgeType, Dictionary, Project, skills as skillsData } from '@/content/dictionaries';
import { site, type Locale } from '@/content/site';

interface PortfolioProps {
  locale: Locale;
  t: Dictionary;
  projects: Project[];
  skills: typeof skillsData;
}

const areaIcons = [
  <Code key="code" className="text-orange-500" size={24} aria-hidden />,
  <Server key="server" className="text-yellow-400" size={24} aria-hidden />,
  <Users key="users" className="text-red-500" size={24} aria-hidden />,
  <Briefcase key="briefcase" className="text-orange-400" size={24} aria-hidden />,
];

const badgeStyles: Record<BadgeType, string> = {
  accelerated: 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30',
  enhanced: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30',
  performance: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30',
};

const Portfolio: React.FC<PortfolioProps> = ({ locale, t, projects, skills }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const glowRef = useRef<HTMLDivElement>(null);
  const otherLocale: Locale = locale === 'en' ? 'es' : 'en';

  // Flashlight effect: write CSS variables directly instead of re-rendering
  // the whole page on every mouse move.
  useEffect(() => {
    let frame = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glowRef.current?.style.setProperty('--x', `${e.clientX}px`);
        glowRef.current?.style.setProperty('--y', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const card = isDarkMode
    ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
    : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl';
  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const body = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const sectionTitle = 'text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-1/2 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-orange-500 focus:text-white">
        {t.skipToContent}
      </a>

      <button
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label={t.themeToggle}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-800 shadow-lg'}`}
      >
        {isDarkMode ? <Sun size={24} aria-hidden /> : <Moon size={24} aria-hidden />}
      </button>

      <Link
        href={`/${otherLocale}`}
        hrefLang={otherLocale}
        aria-label={t.switchLanguage.aria}
        className={`fixed top-20 right-6 z-50 flex items-center gap-1.5 px-3 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' : 'bg-white hover:bg-gray-100 text-gray-800 shadow-lg'}`}
      >
        <Languages size={18} aria-hidden />
        {otherLocale.toUpperCase()}
      </Link>

      <TimeZonePanel locale={locale} t={t.time} isDarkMode={isDarkMode} />

      <div
        ref={glowRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 30%), ${isDarkMode ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 107, 53, 0.08)'}, transparent 60%)`,
        }}
      />

      <main id="main">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 md:pt-0">
          <div className="max-w-5xl mx-auto w-full z-20">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20">
                    <Image
                      src={site.profileImage}
                      alt={t.hero.photoAlt}
                      width={448}
                      height={448}
                      preload
                      sizes="(min-width: 768px) 224px, 176px"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-green-500 text-xs font-semibold whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden />
                    {t.hero.openToRemote}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center w-full max-w-xs">
                  {t.hero.stats.map((stat) => (
                    <div key={stat.label} className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
                      <p className="text-xl font-bold text-orange-400">{stat.value}</p>
                      <p className={`text-xs leading-tight mt-0.5 ${muted}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 ${isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-400' : 'bg-white border border-gray-200 text-gray-500 shadow-sm'}`}>
                  <MapPin size={12} className="text-orange-400" aria-hidden />
                  {t.hero.location}
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent leading-tight">
                  {site.name}
                </h1>
                <p className={`text-lg md:text-xl mb-2 font-semibold leading-snug ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {site.jobTitle}
                </p>
                <p className={`text-base mb-4 leading-relaxed ${body}`}>{t.hero.tagline}</p>
                <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.hero.subtitle}</p>

                <ul className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {['Node.js', 'TypeScript', 'React', 'Next.js', 'PostgreSQL', 'AWS', 'Claude Code'].map((tech) => (
                    <li key={tech} className={`px-3 py-1 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a href="#contact" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 text-white font-medium">
                    <Mail size={18} aria-hidden />
                    {t.contact.emailMe}
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-md'}`}>
                    <Linkedin size={18} aria-hidden />
                    LinkedIn
                  </a>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-md'}`}>
                    <Github size={18} aria-hidden />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center animate-bounce" aria-hidden>
              <ChevronDown size={28} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20 px-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <h2 className={sectionTitle}>{t.about.title}</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 20)} className={`text-lg leading-relaxed ${body}`}>{paragraph}</p>
                ))}
              </div>
              <ul className="space-y-6">
                {t.about.areas.map((area, i) => (
                  <li key={area} className="flex items-center gap-4">
                    {areaIcons[i]}
                    <span className="text-lg">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <AIAcceleratedSection isDarkMode={isDarkMode} language={locale} />

        <AutomationSection locale={locale} t={t.automation} isDarkMode={isDarkMode} />

        {/* Skills */}
        <section className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={sectionTitle}>{t.skillsTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((group) => {
                const isAI = 'isAI' in group && group.isAI;
                return (
                  <div
                    key={group.category}
                    className={`p-6 rounded-lg hover:scale-105 transition-all duration-300 ${isAI
                      ? isDarkMode
                        ? 'bg-gradient-to-br from-gray-800 to-gray-800/50 border-2 border-orange-500/40 hover:border-orange-500/60 ring-2 ring-orange-500/10'
                        : 'bg-gradient-to-br from-orange-50 to-white border-2 border-orange-500/50 hover:border-orange-500/70 shadow-lg hover:shadow-xl'
                      : card}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {isAI && <Zap size={20} className="text-orange-500" aria-hidden />}
                      <h3 className={`text-xl font-semibold ${isAI ? 'text-orange-500' : 'text-orange-400'}`}>{group.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((skill) => (
                        <li key={skill} className={body}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 px-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <h2 className={sectionTitle}>{t.experience.title}</h2>
            <div className="space-y-8">
              {t.experience.items.map((exp) => (
                <article key={exp.period} className={`p-8 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800/30 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-500 shadow-lg hover:shadow-xl'}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-1">
                    <div>
                      <h3 className="text-xl font-semibold text-orange-400">{exp.title}</h3>
                      <p className={`text-sm font-medium mt-0.5 ${muted}`}>{exp.company}</p>
                    </div>
                    <span className={`text-sm shrink-0 mt-1 ${muted}`}>{exp.period}</span>
                  </div>
                  <p className={`mb-4 leading-relaxed ${body}`}>{exp.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className={`bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-3 py-1 rounded-full text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects — each card links to its case study */}
        <section id="projects" className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={sectionTitle}>{t.projects.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/${locale}/projects/${project.slug}`}
                  className={`flex flex-col p-6 rounded-lg transition-all duration-300 group hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${project.flagship
                    ? isDarkMode
                      ? 'bg-gray-800 border border-orange-500/50 hover:border-orange-500 shadow-lg shadow-orange-500/10'
                      : 'bg-white border border-orange-500/60 hover:border-orange-500 shadow-lg shadow-orange-500/10 hover:shadow-xl'
                    : card}`}
                >
                  {project.images?.[0] && (
                    <div className="w-full h-44 rounded-lg overflow-hidden mb-4 border border-orange-500/20">
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt[locale]}
                        width={project.images[0].width}
                        height={project.images[0].height}
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.flagship && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        {t.projects.flagship}
                      </span>
                    )}
                    {project.badge && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[project.badge]}`}>
                        {project.badge === 'enhanced' ? <Cpu size={12} aria-hidden /> : <Zap size={12} aria-hidden />}
                        {t.projects.badges[project.badge]}
                      </span>
                    )}
                    {project.url && !project.urlRequiresLogin && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/15 border border-green-500/40 text-green-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden />
                        {t.projects.live}
                      </span>
                    )}
                    {project.isPrivate && (
                      <span className={`inline-flex items-center gap-1 text-xs ${muted}`}>
                        <Lock size={12} aria-hidden />
                        {t.projects.privateProject}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-orange-400 group-hover:text-orange-300">{project.title}</h3>
                  {project.metric && (
                    <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>&#8599; {project.metric}</p>
                  )}
                  <p className={`mb-4 leading-relaxed text-sm ${body}`}>{project.summary}</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <li key={tech} className={`bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-3 py-1 rounded-full text-xs ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 group-hover:gap-2.5 transition-all">
                    {t.projects.readCaseStudy}
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection locale={locale} t={t.contact} openToRemote={t.hero.openToRemote} isDarkMode={isDarkMode} />
      </main>

      <footer className={`py-8 px-4 border-t relative z-20 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <p className={`max-w-4xl mx-auto text-center ${muted}`}>
          © {new Date().getFullYear()} {site.name}. {t.footer}
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;

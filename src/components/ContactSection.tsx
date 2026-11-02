'use client';

import React, { useState } from 'react';
import { Calendar, Check, Copy, Download, ExternalLink, Github, Linkedin, Mail, Send } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries';
import { site, type Locale } from '@/content/site';

interface ContactSectionProps {
  locale: Locale;
  t: Dictionary['contact'];
  openToRemote: string;
  isDarkMode: boolean;
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

const ContactSection: React.FC<ContactSectionProps> = ({ locale, t, openToRemote, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const cvUrl = site.cv[locale];

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? '') || (data.message?.trim().length ?? 0) < 10) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const secondaryButton = `flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode
    ? 'bg-gray-800 hover:bg-gray-700 border border-orange-500/20 hover:border-orange-500/40'
    : 'bg-white hover:bg-gray-50 border border-orange-500/30 hover:border-orange-500/60 shadow-lg'}`;
  const input = `w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode
    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`;
  const label = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <section id="contact" className="py-20 px-4 relative z-20 scroll-mt-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/40 text-green-500 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden />
            {openToRemote}
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">{t.title}</h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.text}</p>

          {/* Email shown as text so recruiters can copy it without leaving the page */}
          <div className={`inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow'}`}>
            <Mail size={18} className="text-orange-500" aria-hidden />
            <a href={`mailto:${site.email}`} className="font-mono text-base hover:text-orange-400 underline-offset-4 hover:underline">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              <span aria-live="polite">{copied ? t.copied : t.copy}</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 text-white font-medium">
                <Calendar size={18} aria-hidden />
                {t.bookCall}
              </a>
            )}
            {cvUrl && (
              <a href={cvUrl} download className={secondaryButton}>
                <Download size={18} aria-hidden />
                {t.downloadCv}
              </a>
            )}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <Linkedin size={18} aria-hidden />
              {t.linkedin}
              <ExternalLink size={14} aria-hidden />
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <Github size={18} aria-hidden />
              {t.github}
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className={`max-w-2xl mx-auto p-6 md:p-8 rounded-xl text-left ${isDarkMode ? 'bg-gray-800/60 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}
        >
          <h3 className="text-2xl font-semibold mb-6 text-orange-400">{t.form.title}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="contact-name" className={label}>{t.form.name}</label>
              <input id="contact-name" name="name" required autoComplete="name" maxLength={100} className={input} />
            </div>
            <div>
              <label htmlFor="contact-email" className={label}>{t.form.email}</label>
              <input id="contact-email" name="email" type="email" required autoComplete="email" maxLength={200} className={input} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="contact-company" className={label}>{t.form.company}</label>
            <input id="contact-company" name="company" autoComplete="organization" maxLength={100} className={input} />
          </div>
          <div className="mb-6">
            <label htmlFor="contact-message" className={label}>{t.form.message}</label>
            <textarea id="contact-message" name="message" required rows={5} maxLength={5000} className={input} />
          </div>
          {/* Honeypot: hidden from people, filled in by bots */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 px-8 py-3 rounded-full text-white font-medium transition-all"
          >
            <Send size={18} aria-hidden />
            {status === 'sending' ? t.form.sending : t.form.send}
          </button>

          <p role="status" aria-live="polite" className="mt-4 text-sm min-h-5">
            {status === 'sent' && <span className="text-green-500">{t.form.success}</span>}
            {status === 'invalid' && <span className="text-red-400">{t.form.invalid}</span>}
            {status === 'error' && (
              <span className="text-red-400">
                {t.form.error} <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;

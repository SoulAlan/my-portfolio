'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries';
import { site, type Locale } from '@/content/site';

interface ContactFormProps {
  locale: Locale;
  t: Dictionary['contact']['form'];
  isDarkMode: boolean;
  // Keeps label/input ids unique when the form appears in more than one place.
  idPrefix: string;
  autoFocus?: boolean;
  showTitle?: boolean;
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

const ContactForm: React.FC<ContactFormProps> = ({ locale, t, isDarkMode, idPrefix, autoFocus = false, showTitle = true }) => {
  const [status, setStatus] = useState<Status>('idle');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) nameRef.current?.focus();
  }, [autoFocus]);

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

  const input = `w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-orange-500 ${isDarkMode
    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`;
  const label = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const id = (field: string) => `${idPrefix}-${field}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left">
      {showTitle && <h3 className="text-2xl font-semibold mb-6 text-orange-400">{t.title}</h3>}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={id('name')} className={label}>{t.name}</label>
          <input ref={nameRef} id={id('name')} name="name" required autoComplete="name" maxLength={100} className={input} />
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>{t.email}</label>
          <input id={id('email')} name="email" type="email" required autoComplete="email" maxLength={200} className={input} />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor={id('company')} className={label}>{t.company}</label>
        <input id={id('company')} name="company" autoComplete="organization" maxLength={100} className={input} />
      </div>
      <div className="mb-6">
        <label htmlFor={id('message')} className={label}>{t.message}</label>
        <textarea id={id('message')} name="message" required rows={5} maxLength={5000} className={input} />
      </div>
      {/* Honeypot: hidden from people, filled in by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 px-8 py-3 rounded-full text-white font-medium transition-all"
      >
        <Send size={18} aria-hidden />
        {status === 'sending' ? t.sending : t.send}
      </button>

      <p role="status" aria-live="polite" className="mt-4 text-sm min-h-5">
        {status === 'sent' && <span className="text-green-500">{t.success}</span>}
        {status === 'invalid' && <span className="text-red-400">{t.invalid}</span>}
        {status === 'error' && (
          <span className="text-red-400">
            {t.error} <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        )}
      </p>
    </form>
  );
};

export default ContactForm;

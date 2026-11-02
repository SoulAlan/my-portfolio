// Single source of truth for URLs, contact details and assets used across
// metadata, structured data, llms.txt and the UI.

export const SITE_URL = 'https://www.alancifuentes.com';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const site = {
  name: 'Alan Cifuentes',
  jobTitle: 'Senior Full Stack Engineer',
  email: 'a.fernando_cifuentes@yahoo.com',
  linkedin: 'https://linkedin.com/in/alancifuentessiliezar',
  github: 'https://github.com/SoulAlan',
  timezone: 'America/Guatemala',
  // Swap for a real headshot (e.g. /alan.jpg) — recruiters hire a person, not a logo.
  profileImage: '/logo.png',
  // Fill these in to show "Download CV" and "Book a call" buttons. Null hides them.
  cv: { en: null, es: null } as Record<Locale, string | null>,
  bookingUrl: null as string | null,
};

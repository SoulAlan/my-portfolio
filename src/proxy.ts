import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/content/site';

// English is the primary language; Spanish only when the browser prefers it
// over English.
function preferredLocale(request: NextRequest) {
  const header = request.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const lang = part.split(';')[0].trim().slice(0, 2).toLowerCase();
    if (lang === 'en' || lang === 'es') return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension
  // (robots.txt, sitemap.xml, llms.txt, images).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

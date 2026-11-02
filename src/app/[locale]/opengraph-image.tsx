import { ImageResponse } from 'next/og';
import { getDictionary } from '@/content/dictionaries';
import { isLocale, locales, site } from '@/content/site';

export const alt = `${site.name} — ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : 'en');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 60%, #7c2d12 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#fb923c', marginBottom: 24 }}>
          {t.hero.location} · {t.hero.openToRemote}
        </div>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, marginBottom: 12 }}>{site.name}</div>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 600, color: '#e5e7eb', marginBottom: 32 }}>
          {site.jobTitle}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#d1d5db', maxWidth: 1000, lineHeight: 1.35 }}>
          {t.hero.tagline}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#9ca3af', marginTop: 40 }}>
          Node.js · TypeScript · React · Next.js · PostgreSQL · AWS · Claude
        </div>
      </div>
    ),
    size,
  );
}

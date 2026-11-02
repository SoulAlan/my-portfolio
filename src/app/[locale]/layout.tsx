import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import ChatWidget from '@/components/ChatWidget';
import { getDictionary, skills } from '@/content/dictionaries';
import { SITE_URL, isLocale, locales, site } from '@/content/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: site.name, url: SITE_URL }],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', es: '/es', 'x-default': '/en' },
    },
    openGraph: {
      type: 'profile',
      url: `/${locale}`,
      title: t.meta.title,
      description: t.meta.ogDescription,
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'es_GT',
      alternateLocale: locale === 'en' ? 'es_GT' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: site.name,
  jobTitle: site.jobTitle,
  url: SITE_URL,
  email: `mailto:${site.email}`,
  image: `${SITE_URL}${site.profileImage}`,
  sameAs: [site.linkedin, site.github],
  address: { '@type': 'PostalAddress', addressCountry: 'GT' },
  knowsLanguage: ['es', 'en'],
  knowsAbout: skills.flatMap((group) => group.items),
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <ChatWidget locale={locale} t={getDictionary(locale).chat} email={site.email} />
      </body>
    </html>
  );
}

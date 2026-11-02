import type { MetadataRoute } from 'next';
import { projectSlugs } from '@/content/dictionaries';
import { SITE_URL, locales } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...projectSlugs.map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}

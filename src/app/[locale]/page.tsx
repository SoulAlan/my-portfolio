import { notFound } from 'next/navigation';
import Portfolio from '@/components/Portfolio';
import { getDictionary, getProjects, skills } from '@/content/dictionaries';
import { isLocale } from '@/content/site';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <Portfolio
      locale={locale}
      t={getDictionary(locale)}
      projects={getProjects(locale)}
      skills={skills}
    />
  );
}

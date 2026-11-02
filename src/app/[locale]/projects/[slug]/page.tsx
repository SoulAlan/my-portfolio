import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Languages, Lock, Mail } from 'lucide-react';
import { getDictionary, getProject, getProjects, projectSlugs } from '@/content/dictionaries';
import { isLocale, locales, site } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};

  const title = `${project.title} — ${site.name}`;
  // Setting openGraph here replaces the layout's, so point back at the locale's generated image.
  const images = [`/${locale}/opengraph-image`];
  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: { en: `/en/projects/${slug}`, es: `/es/projects/${slug}`, 'x-default': `/en/projects/${slug}` },
    },
    openGraph: {
      type: 'article',
      url: `/${locale}/projects/${slug}`,
      title,
      description: project.summary,
      siteName: site.name,
      images,
    },
    twitter: { card: 'summary_large_image', title, description: project.summary, images },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-orange-400">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gray-300">
          <span className="text-orange-500 mt-0.5" aria-hidden>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();

  const t = getDictionary(locale);
  const c = t.caseStudy;
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const others = getProjects(locale).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="max-w-4xl mx-auto px-4 pt-8 flex items-center justify-between gap-4">
        <Link href={`/${locale}#projects`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400">
          <ArrowLeft size={16} aria-hidden />
          {c.back}
        </Link>
        <Link
          href={`/${otherLocale}/projects/${slug}`}
          hrefLang={otherLocale}
          aria-label={t.switchLanguage.aria}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-blue-400 text-sm font-semibold"
        >
          <Languages size={16} aria-hidden />
          {otherLocale.toUpperCase()}
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          {project.isPrivate && (
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-400 mb-4">
              <Lock size={12} aria-hidden />
              {c.privateNote}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">{project.summary}</p>
        </div>

        {project.metric && (
          <div className="mb-12 p-6 rounded-xl border border-green-500/30 bg-green-500/10">
            <p className="text-xs uppercase tracking-wide text-green-400 mb-1">{c.keyResult}</p>
            <p className="text-2xl font-semibold text-green-300">{project.metric}</p>
          </div>
        )}

        {project.challenge && (
          <Section title={c.challenge}>
            <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
          </Section>
        )}

        <Section title={c.built}>
          <Bullets items={project.details} />
        </Section>

        {project.architecture?.length ? (
          <Section title={c.architecture}>
            <Bullets items={project.architecture} />
          </Section>
        ) : null}

        {project.decisions?.length ? (
          <Section title={c.decisions}>
            <Bullets items={project.decisions} />
          </Section>
        ) : null}

        {project.results?.length ? (
          <Section title={c.results}>
            <Bullets items={project.results} />
          </Section>
        ) : null}

        {project.images?.length ? (
          <Section title={c.screenshots}>
            <div className="grid gap-6">
              {project.images.map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt[locale]}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 896px) 864px, 100vw"
                  className="rounded-lg border border-orange-500/30"
                />
              ))}
            </div>
          </Section>
        ) : null}

        <Section title={c.stack}>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-3 py-1 rounded-full text-sm text-red-300">
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 mb-16">
          <h2 className="text-xl font-semibold mb-2">{c.ctaTitle}</h2>
          <p className="text-gray-400 mb-4">{c.ctaText}</p>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-mono">
            <Mail size={16} aria-hidden />
            {site.email}
          </a>
        </div>

        <nav aria-label={c.otherProjects}>
          <h2 className="text-xl font-semibold mb-4">{c.otherProjects}</h2>
          <ul className="grid md:grid-cols-3 gap-4">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/${locale}/projects/${p.slug}`} className="group flex flex-col h-full p-4 rounded-lg bg-gray-800 border border-orange-500/20 hover:border-orange-500/50">
                  <span className="text-orange-400 font-medium mb-2">{p.title}</span>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-orange-300">
                    {t.projects.readCaseStudy}
                    <ArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}

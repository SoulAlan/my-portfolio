import { getDictionary, getProjects, skills } from './dictionaries';
import { SITE_URL, site } from './site';

// Facts that are true but not shown on the page (other clients, side projects,
// tooling, availability details). The AI assistant and llms.txt use them, so
// only add things you are happy for recruiters to read.
export const extraFacts: string[] = [];

// Plain-text profile built from the same content the site renders, so the
// assistant can never drift from what the page says. `compact` drops the
// longer case-study sections to keep each chat request within the free-tier
// tokens-per-minute budget; llms.txt uses the full version.
export function buildProfileText({ compact = false }: { compact?: boolean } = {}): string {
  const t = getDictionary('en');
  const projects = getProjects('en');

  const lines: string[] = [
    `# ${site.name} — ${site.jobTitle}`,
    '',
    `${t.hero.tagline}.`,
    t.hero.subtitle,
    `Location: Guatemala (time zone ${site.timezone}, UTC-6, no daylight saving). Works remotely. ${t.hero.openToRemote}.`,
    `Contact: ${site.email} · LinkedIn ${site.linkedin} · GitHub ${site.github} · Website ${SITE_URL}`,
    '',
    '## About',
    ...(compact ? t.about.paragraphs.slice(0, 2) : t.about.paragraphs),
    `Focus areas: ${t.about.areas.join(', ')}.`,
    '',
    '## Skills',
    ...skills.map((group) => `- ${group.category}: ${group.items.join(', ')}`),
    '',
    '## Experience',
    ...t.experience.items.flatMap((job) => [
      `### ${job.title} — ${job.company} (${job.period})`,
      job.description,
      `Highlights: ${job.highlights.join('; ')}`,
    ]),
    '',
    '## Projects',
    ...projects.flatMap((p) => [
      `### ${p.title}`,
      `Case study: ${SITE_URL}/en/projects/${p.slug}`,
      ...(p.url ? [`${p.urlRequiresLogin ? "App (sign-in required)" : "Live site"}: ${p.url}`] : []),
      p.summary,
      ...(p.metric ? [`Key result: ${p.metric}`] : []),
      ...(p.challenge && !compact ? [`Challenge: ${p.challenge}`] : []),
      ...(compact ? [] : p.details.map((d) => `- ${d}`)),
      ...(p.architecture ?? []).map((d) => `- Architecture: ${d}`),
      ...(compact ? [] : (p.decisions ?? []).map((d) => `- Decision: ${d}`)),
      ...(p.results ?? []).map((d) => `- Result: ${d}`),
      `Stack: ${p.tech.join(', ')}`,
      ...(p.isPrivate ? ['Private client project (NDA).'] : []),
    ]),
  ];

  if (extraFacts.length > 0) {
    lines.push('', '## Additional facts', ...extraFacts.map((f) => `- ${f}`));
  }

  return lines.join('\n');
}

import { buildProfileText } from '@/content/knowledge';
import { SITE_URL } from '@/content/site';

export const dynamic = 'force-static';

// https://llmstxt.org — a plain-text profile for AI search tools and assistants.
export function GET() {
  const text = `${buildProfileText()}

## Pages
- English: ${SITE_URL}/en
- Español: ${SITE_URL}/es
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

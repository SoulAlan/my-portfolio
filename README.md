# alancifuentes.com

Personal portfolio — Next.js 16 (App Router), Tailwind CSS 4, deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

`/` redirects to `/en` or `/es` based on the browser language (English by default).

## Where things live

| What | File |
| --- | --- |
| Domain, email, social links, photo, CV and booking links | `src/content/site.ts` |
| All page copy (EN + ES), projects and skills | `src/content/dictionaries.ts` |
| Extra facts for the AI assistant and `llms.txt` | `src/content/knowledge.ts` (`extraFacts`) |
| Case study pages | `src/app/[locale]/projects/[slug]/page.tsx` |
| AI assistant API | `src/app/api/chat/route.ts` |
| Contact form API | `src/app/api/contact/route.ts` |

Case study sections `challenge`, `architecture`, `decisions` and `results` are optional per project and only render when filled in.

## Environment variables (set in Vercel)

| Variable | Used by | Notes |
| --- | --- | --- |
| `GROQ_API_KEY` | AI assistant | Free key from console.groq.com. Without it `/api/chat` returns 503 and the widget shows the email instead. |
| `RESEND_API_KEY` | Contact form | Provided by the Resend integration. |
| `CONTACT_FROM_EMAIL` | Contact form | Sender on a domain verified in Resend, e.g. `Portfolio <contact@alancifuentes.com>`. |
| `CONTACT_TO_EMAIL` | Contact form | Optional; defaults to the email in `site.ts`. |

Run `vercel env pull` to copy them into `.env.local` for local testing.

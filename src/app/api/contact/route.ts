import { Resend } from 'resend';
import { site } from '@/content/site';

// RESEND_API_KEY and RESEND_EMAIL_DOMAIN come from the Resend integration on Vercel.
// The sender domain must be verified in Resend before mail is delivered.
const FROM = process.env.CONTACT_FROM_EMAIL
  ?? (process.env.RESEND_EMAIL_DOMAIN ? `Portfolio <contact@${process.env.RESEND_EMAIL_DOMAIN}>` : 'Portfolio <onboarding@resend.dev>');
const TO = process.env.CONTACT_TO_EMAIL ?? site.email;

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot filled in: pretend success so bots don't retry.
  if (clean(body?.website, 200)) return Response.json({ ok: true });

  const name = clean(body?.name, 100);
  const email = clean(body?.email, 200);
  const company = clean(body?.company, 100);
  const message = clean(body?.message, 5000);
  const locale = body?.locale === 'es' ? 'es' : 'en';

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return Response.json({ error: 'invalid' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('contact form: RESEND_API_KEY is not set');
    return Response.json({ error: 'unavailable' }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: `Portfolio contact: ${name}${company ? ` (${company})` : ''}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nSite language: ${locale}\n\n${message}`,
  });

  if (error) {
    console.error('contact form: Resend error', error);
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}

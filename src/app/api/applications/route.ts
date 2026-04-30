import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/server';
import { getResend, EMAIL_FROM } from '@/lib/email/resend';
import {
  applicationReceivedEmail,
  adminNewApplicationEmail,
  type ApplicationData,
} from '@/lib/email/templates';

interface IncomingPayload {
  childName?: string;
  childAge?: number | string | null;
  parentName?: string;
  email?: string;
  phone?: string;
  preferredSession?: string;
  message?: string;
  consent?: boolean;
  language?: string;
}

const ALLOWED_SESSIONS = new Set(['10:00', '11:00', 'either']);
const ALLOWED_LANGUAGES = new Set(['en', 'ko']);

// Very small in-memory rate limit (per server instance). Good enough for the
// pilot; replace with Upstash for production scale.
const recentSubmissions = new Map<string, number>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 3;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  // prune
  for (const [k, ts] of recentSubmissions) {
    if (now - ts > RATE_WINDOW_MS) recentSubmissions.delete(k);
  }
  const count = [...recentSubmissions.entries()].filter(
    ([k, ts]) => k.startsWith(`${key}:`) && now - ts < RATE_WINDOW_MS
  ).length;
  if (count >= RATE_MAX) return true;
  recentSubmissions.set(`${key}:${now}`, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = (await request.json()) as IncomingPayload;

    // ── Validation ────────────────────────────────────────
    const childName = body.childName?.trim();
    const parentName = body.parentName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const preferredSession = body.preferredSession ?? 'either';
    const language = body.language ?? 'en';
    const message = body.message?.trim() || null;
    const consent = body.consent === true;
    const childAge =
      body.childAge === null || body.childAge === undefined || body.childAge === ''
        ? null
        : Number(body.childAge);

    if (!childName || !parentName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!ALLOWED_SESSIONS.has(preferredSession)) {
      return NextResponse.json({ error: 'Invalid preferredSession' }, { status: 400 });
    }
    if (!ALLOWED_LANGUAGES.has(language)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }
    if (childAge !== null && (Number.isNaN(childAge) || childAge < 3 || childAge > 18)) {
      return NextResponse.json({ error: 'Invalid childAge' }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    // ── Persist ───────────────────────────────────────────
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('applicants')
      .insert({
        child_name: childName,
        child_age: childAge,
        parent_name: parentName,
        email,
        phone,
        message,
        preferred_session: preferredSession,
        language,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[applications] insert error', error);
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    const data: ApplicationData = {
      childName,
      childAge,
      parentName,
      email,
      phone,
      preferredSession: preferredSession as ApplicationData['preferredSession'],
      message,
      language: language as ApplicationData['language'],
    };

    // ── Notify (email is best-effort; do not fail the request if it fails) ──
    const { data: adminRows } = await supabase
      .from('admins')
      .select('email');
    const adminEmails = (adminRows ?? []).map((r) => r.email).filter(Boolean);

    const resend = getResend();
    const applicantEmail = applicationReceivedEmail(data);
    const adminEmail = adminNewApplicationEmail(data, inserted.id);

    const sendApplicant = resend.emails
      .send({
        from: EMAIL_FROM,
        to: email,
        replyTo: adminEmails[0] || undefined,
        subject: applicantEmail.subject,
        html: applicantEmail.html,
        text: applicantEmail.text,
      })
      .catch((e) => console.error('[applications] applicant email failed', e));

    const sendAdmin =
      adminEmails.length > 0
        ? resend.emails
            .send({
              from: EMAIL_FROM,
              to: adminEmails,
              replyTo: email,
              subject: adminEmail.subject,
              html: adminEmail.html,
              text: adminEmail.text,
            })
            .catch((e) => console.error('[applications] admin email failed', e))
        : Promise.resolve();

    await Promise.all([sendApplicant, sendAdmin]);

    return NextResponse.json({ id: inserted.id }, { status: 201 });
  } catch (e) {
    console.error('[applications] unexpected', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getResend, EMAIL_FROM, ADMIN_NOTIFY_EMAILS } from '@/lib/email/resend';

export async function GET() {
  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_NOTIFY_EMAILS[0] || 'ktw909@gmail.com',
      subject: '[VTS] Resend debug test',
      text: 'If you can read this, Resend is configured correctly.',
      html: '<p>If you can read this, <strong>Resend is configured correctly</strong>.</p>',
    });
    return NextResponse.json({
      ok: true,
      from: EMAIL_FROM,
      adminTargets: ADMIN_NOTIFY_EMAILS,
      result,
    });
  } catch (e: unknown) {
    const err = e as { message?: string; name?: string; statusCode?: number };
    return NextResponse.json(
      {
        ok: false,
        error: err.message ?? String(e),
        name: err.name,
        statusCode: err.statusCode,
      },
      { status: 500 }
    );
  }
}

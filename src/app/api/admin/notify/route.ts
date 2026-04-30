import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getServiceSupabase } from '@/lib/supabase/server';
import { getResend, EMAIL_FROM } from '@/lib/email/resend';
import {
  assignmentConfirmedEmail,
  waitlistEmail,
  rejectedEmail,
  type ApplicationData,
} from '@/lib/email/templates';

type Kind = 'assignment' | 'waitlist' | 'rejected';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { applicantId, kind } = (await req.json()) as { applicantId: string; kind: Kind };
  if (!applicantId || !['assignment', 'waitlist', 'rejected'].includes(kind)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const sb = getServiceSupabase();
  const { data: applicant, error: aErr } = await sb
    .from('applicants')
    .select('*')
    .eq('id', applicantId)
    .maybeSingle();

  if (aErr || !applicant) {
    return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
  }

  const data: ApplicationData = {
    childName: applicant.child_name,
    childAge: applicant.child_age,
    parentName: applicant.parent_name,
    email: applicant.email,
    phone: applicant.phone,
    preferredSession: applicant.preferred_session,
    message: applicant.message,
    language: applicant.language,
  };

  let subject: string;
  let html: string;
  let text: string;

  if (kind === 'assignment') {
    const { data: assignment } = await sb
      .from('assignments')
      .select('session_id, class_sessions(start_time)')
      .eq('applicant_id', applicantId)
      .maybeSingle();

    const startTime = (
      assignment?.class_sessions as unknown as { start_time?: string } | null
    )?.start_time;
    if (!assignment || !startTime || (startTime !== '10:00' && startTime !== '11:00')) {
      return NextResponse.json(
        { error: 'No session assigned to this applicant' },
        { status: 400 }
      );
    }
    const tpl = assignmentConfirmedEmail(data, startTime);
    subject = tpl.subject;
    html = tpl.html;
    text = tpl.text;
  } else if (kind === 'waitlist') {
    const tpl = waitlistEmail(data);
    subject = tpl.subject;
    html = tpl.html;
    text = tpl.text;
  } else {
    const tpl = rejectedEmail(data);
    subject = tpl.subject;
    html = tpl.html;
    text = tpl.text;
  }

  const { data: adminRows } = await sb.from('admins').select('email').limit(1);
  const replyTo = adminRows?.[0]?.email || undefined;

  const resend = getResend();
  const sendResult = await resend.emails.send({
    from: EMAIL_FROM,
    to: applicant.email,
    replyTo,
    subject,
    html,
    text,
  });

  if (sendResult.error) {
    return NextResponse.json(
      { error: sendResult.error.message ?? 'Send failed' },
      { status: 502 }
    );
  }

  if (kind === 'assignment') {
    await sb
      .from('assignments')
      .update({ notification_sent_at: new Date().toISOString() })
      .eq('applicant_id', applicantId);
    await sb.from('applicants').update({ status: 'confirmed' }).eq('id', applicantId);
  }

  return NextResponse.json({ ok: true, id: sendResult.data?.id });
}

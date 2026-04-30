import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;
  const admin = guard;

  const { applicantId, sessionId } = await req.json();
  if (!applicantId || !sessionId) {
    return NextResponse.json({ error: 'applicantId and sessionId required' }, { status: 400 });
  }

  const sb = getServiceSupabase();

  // Upsert: one applicant -> one session (unique on applicant_id)
  const { error: delErr } = await sb
    .from('assignments')
    .delete()
    .eq('applicant_id', applicantId);
  if (delErr) {
    return NextResponse.json({ error: delErr.message }, { status: 500 });
  }

  const { error: insErr } = await sb.from('assignments').insert({
    applicant_id: applicantId,
    session_id: sessionId,
    assigned_by: admin.id,
  });
  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 400 });
  }

  await sb.from('applicants').update({ status: 'assigned' }).eq('id', applicantId);

  return NextResponse.json({ ok: true });
}

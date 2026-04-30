import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getServiceSupabase } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { applicantId } = await req.json();
  if (!applicantId) {
    return NextResponse.json({ error: 'applicantId required' }, { status: 400 });
  }
  const sb = getServiceSupabase();
  const { error } = await sb.from('assignments').delete().eq('applicant_id', applicantId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await sb.from('applicants').update({ status: 'new' }).eq('id', applicantId);

  return NextResponse.json({ ok: true });
}

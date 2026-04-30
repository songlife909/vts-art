import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getServiceSupabase } from '@/lib/supabase/server';

const ALLOWED = new Set([
  'new',
  'waitlist',
  'assigned',
  'confirmed',
  'cancelled',
  'rejected',
]);

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { applicantId, status } = await req.json();
  if (!applicantId || !ALLOWED.has(status)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const sb = getServiceSupabase();
  const { error } = await sb.from('applicants').update({ status }).eq('id', applicantId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

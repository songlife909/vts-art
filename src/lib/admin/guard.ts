import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/supabase/auth';

/**
 * Returns either the current admin record or a NextResponse 401/403 to bail out with.
 * Use at the top of every admin API route:
 *
 *   const guard = await requireAdmin();
 *   if (guard instanceof NextResponse) return guard;
 *   const admin = guard;
 */
export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }
  return admin;
}

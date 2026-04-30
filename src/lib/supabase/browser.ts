'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client (anon key only).
 * Safe to use in client components for auth (magic link) and reads
 * permitted by RLS.
 */
export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

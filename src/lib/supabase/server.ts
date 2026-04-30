import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client with service-role privileges.
 * NEVER import this from a client component.
 *
 * Used by API routes that need to bypass RLS (e.g., inserting applications
 * from anon visitors with the same data integrity as an admin).
 */
export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY'
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

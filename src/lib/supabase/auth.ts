import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client tied to the current request's cookies.
 * Use this in Server Components, Route Handlers, and Server Actions
 * that need the *user's* session (RLS enforced).
 */
export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet: { name: string; value: string; options: CookieOptions }[]) => {
          try {
            for (const c of toSet) cookieStore.set(c.name, c.value, c.options);
          } catch {
            // Called from a Server Component — middleware will refresh on next request.
          }
        },
      },
    }
  );
}

/**
 * Returns the admin record for the current session, or null if the user
 * is not authenticated or not in the admins whitelist.
 */
export async function getCurrentAdmin() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data: admin } = await supabase
    .from('admins')
    .select('id, email, name, role')
    .eq('email', user.email)
    .maybeSingle();

  return admin;
}

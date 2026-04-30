import { NextResponse, type NextRequest } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/auth';

/**
 * Handles the magic-link callback. Supabase appends `?code=...` (PKCE) which
 * we exchange for a session cookie. After exchange, we verify the user is
 * in the admins whitelist; if not, we sign them out and redirect to /admin/login.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirectTo') ?? '/admin';

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?error=missing_code`);
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error.message)}`
    );
  }

  // Whitelist check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return NextResponse.redirect(`${origin}/admin/login?error=no_session`);
  }

  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('email', user.email)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=not_authorized`);
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}

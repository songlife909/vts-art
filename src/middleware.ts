import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refreshes the Supabase session cookie on every request, and gates /admin/*
 * behind a logged-in user that is in the admins whitelist.
 * Note: middleware uses the anon key + RLS, so the admins table check goes
 * through `is_admin()` policy (or via a direct select that RLS allows for
 * authenticated users).
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet: { name: string; value: string; options: CookieOptions }[]) => {
          for (const c of toSet) request.cookies.set(c.name, c.value);
          response = NextResponse.next({ request });
          for (const c of toSet) response.cookies.set(c.name, c.value, c.options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute =
    pathname === '/admin/login' || pathname.startsWith('/admin/auth/');

  // If admin route and not authenticated → kick to login
  if (isAdminRoute && !isAuthRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // If at /admin/login while already authenticated → go to dashboard
  if (pathname === '/admin/login' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|jpg|jpeg|png|gif|webp)$).*)'],
};

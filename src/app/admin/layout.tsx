import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentAdmin, getServerSupabase } from '@/lib/supabase/auth';
import LogoutButton from './_components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Allow login page to render without admin check
  // (middleware already redirects unauthenticated users)
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let admin: { id: string; email: string; name: string; role: string } | null = null;
  if (user) {
    admin = await getCurrentAdmin();
    if (!admin) {
      // logged in but not whitelisted
      await supabase.auth.signOut();
      redirect('/admin/login?error=not_authorized');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {admin && (
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-14 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
            <nav className="flex items-center gap-4 sm:gap-6 min-w-0">
              <Link href="/admin" className="font-bold text-gray-900 whitespace-nowrap">
                VTS Admin
              </Link>
              <Link href="/admin/applicants" className="text-sm text-gray-700 hover:text-primary-600 whitespace-nowrap">
                Applicants
              </Link>
              <Link href="/admin/sessions" className="text-sm text-gray-700 hover:text-primary-600 whitespace-nowrap">
                Sessions
              </Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-600">
              <span className="truncate max-w-[120px] sm:max-w-none">
                {admin.name}
                <span className="hidden sm:inline text-gray-400"> ({admin.role})</span>
              </span>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
    </div>
  );
}

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <nav className="flex items-center gap-6">
              <Link href="/admin" className="font-bold text-gray-900">
                VTS Admin
              </Link>
              <Link href="/admin/applicants" className="text-sm text-gray-700 hover:text-primary-600">
                Applicants
              </Link>
              <Link href="/admin/sessions" className="text-sm text-gray-700 hover:text-primary-600">
                Sessions
              </Link>
            </nav>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>
                {admin.name} <span className="text-gray-400">({admin.role})</span>
              </span>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}

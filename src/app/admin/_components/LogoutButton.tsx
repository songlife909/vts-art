'use client';

import { getBrowserSupabase } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };
  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-600 hover:text-red-600"
    >
      Sign out
    </button>
  );
}

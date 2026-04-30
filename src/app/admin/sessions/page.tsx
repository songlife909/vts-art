import Link from 'next/link';
import { getServerSupabase } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

interface SessionRow {
  id: string;
  date: string;
  start_time: string;
  capacity: number;
  assigned_count: number | null;
  remaining: number | null;
}

export default async function SessionsPage() {
  const supabase = await getServerSupabase();
  const { data: sessions } = await supabase
    .from('session_capacity')
    .select('id, date, start_time, capacity, assigned_count, remaining')
    .order('start_time');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
        <p className="text-gray-600 mt-1">VTS pilot — May 16, 2026, Vienna VA</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {((sessions ?? []) as SessionRow[]).map((s) => {
          const fillPct = s.capacity > 0
            ? Math.round(((s.assigned_count ?? 0) / s.capacity) * 100)
            : 0;
          return (
            <Link
              key={s.id}
              href={`/admin/sessions/${s.id}`}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-2xl font-bold text-gray-900">{s.start_time}</div>
                <div className="text-sm text-gray-500">{s.date}</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {s.assigned_count ?? 0} / {s.capacity} assigned · {s.remaining ?? s.capacity} open
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary-500 h-2"
                  style={{ width: `${Math.min(fillPct, 100)}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

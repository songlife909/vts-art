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

export default async function AdminDashboard() {
  const supabase = await getServerSupabase();

  const [{ count: totalApplicants }, { data: byStatus }, { data: sessions }] =
    await Promise.all([
      supabase.from('applicants').select('*', { count: 'exact', head: true }),
      supabase.from('applicants').select('status'),
      supabase
        .from('session_capacity')
        .select('id, date, start_time, capacity, assigned_count, remaining')
        .order('start_time'),
    ]);

  const statusCount = (byStatus ?? []).reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">VTS pilot — May 16, 2026, Vienna VA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total applicants" value={totalApplicants ?? 0} />
        <Stat label="New" value={statusCount.new ?? 0} />
        <Stat label="Assigned" value={statusCount.assigned ?? 0} />
        <Stat label="Waitlist" value={statusCount.waitlist ?? 0} />
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Sessions</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Filled</th>
                <th className="px-4 py-3">Remaining</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {(sessions as SessionRow[] | null)?.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 text-sm">{s.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{s.start_time}</td>
                  <td className="px-4 py-3 text-sm">
                    {s.assigned_count ?? 0} / {s.capacity}
                  </td>
                  <td className="px-4 py-3 text-sm">{s.remaining ?? s.capacity}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <Link
                      href={`/admin/sessions/${s.id}`}
                      className="text-primary-600 hover:underline"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <Link
          href="/admin/applicants"
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
        >
          View all applicants →
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-3xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

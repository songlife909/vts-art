import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSupabase } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getServerSupabase();

  const { data: session } = await supabase
    .from('class_sessions')
    .select('id, date, start_time, capacity, location')
    .eq('id', id)
    .maybeSingle();

  if (!session) notFound();

  const { data: assignments } = await supabase
    .from('assignments')
    .select(
      'id, assigned_at, notification_sent_at, applicants(id, child_name, child_age, parent_name, email, phone, status)'
    )
    .eq('session_id', id)
    .order('assigned_at');

  const list = (assignments ?? []) as unknown as Array<{
    id: string;
    assigned_at: string;
    notification_sent_at: string | null;
    applicants: {
      id: string;
      child_name: string;
      child_age: number | null;
      parent_name: string;
      email: string;
      phone: string;
      status: string;
    } | null;
  }>;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/sessions" className="text-sm text-gray-500 hover:text-gray-900">
          ← All sessions
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{session.start_time}</h1>
        <p className="text-gray-600">
          {session.date} · {session.location} · capacity {session.capacity}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">
            Roster · {list.length}/{session.capacity}
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Child</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notified</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((row, i) => {
              const a = row.applicants;
              if (!a) return null;
              return (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-sm text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {a.child_name}
                    {a.child_age && (
                      <span className="ml-1 text-xs text-gray-500">({a.child_age})</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">{a.parent_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <div>{a.email}</div>
                    <div className="text-xs text-gray-500">{a.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{a.status}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {row.notification_sent_at
                      ? new Date(row.notification_sent_at).toLocaleString()
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <Link
                      href={`/admin/applicants/${a.id}`}
                      className="text-primary-600 hover:underline"
                    >
                      Open →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  No assignments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

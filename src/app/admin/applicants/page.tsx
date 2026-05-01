import Link from 'next/link';
import { getServerSupabase } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  waitlist: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-green-100 text-green-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-gray-100 text-gray-700',
  rejected: 'bg-red-100 text-red-800',
};

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const supabase = await getServerSupabase();

  let query = supabase
    .from('applicants')
    .select(
      'id, child_name, child_age, parent_name, email, phone, preferred_session, status, language, created_at'
    )
    .order('created_at', { ascending: false });

  if (params.status) query = query.eq('status', params.status);
  if (params.q) {
    const q = `%${params.q}%`;
    query = query.or(
      `child_name.ilike.${q},parent_name.ilike.${q},email.ilike.${q},phone.ilike.${q}`
    );
  }

  const { data: applicants, error } = await query;

  const rows = applicants ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600 mt-1 text-sm">{rows.length} results</p>
        </div>
        <form className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Search name / email / phone"
            className="w-full sm:w-64 rounded-md border-gray-300 shadow-sm text-sm"
          />
          <select
            name="status"
            defaultValue={params.status ?? ''}
            className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm text-sm"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="waitlist">Waitlist</option>
            <option value="assigned">Assigned</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
          >
            Filter
          </button>
        </form>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">{error.message}</div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
          No applicants yet.
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <ul className="md:hidden space-y-3">
            {rows.map((a) => (
              <li
                key={a.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <Link href={`/admin/applicants/${a.id}`} className="block">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {a.child_name}
                        {a.child_age && (
                          <span className="ml-1.5 text-xs font-normal text-gray-500">
                            age {a.child_age}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {a.parent_name}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-1 text-[11px] rounded-full ${
                        STATUS_BADGE[a.status] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 truncate">{a.email}</div>
                  <div className="text-xs text-gray-500">{a.phone}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>Pref: {a.preferred_session}</span>
                    <span>{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Child</th>
                    <th className="px-4 py-3">Parent</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Pref</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-gray-900">{a.child_name}</div>
                        {a.child_age && (
                          <div className="text-xs text-gray-500">age {a.child_age}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{a.parent_name}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-900">{a.email}</div>
                        <div className="text-xs text-gray-500">{a.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{a.preferred_session}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            STATUS_BADGE[a.status] ?? 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(a.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/applicants/${a.id}`}
                          className="text-primary-600 hover:underline text-sm"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

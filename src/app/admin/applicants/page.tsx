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

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600 mt-1">{applicants?.length ?? 0} results</p>
        </div>
        <form className="flex items-center gap-2">
          <input
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Search name / email / phone"
            className="rounded-md border-gray-300 shadow-sm text-sm"
          />
          <select
            name="status"
            defaultValue={params.status ?? ''}
            className="rounded-md border-gray-300 shadow-sm text-sm"
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
            className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
          >
            Filter
          </button>
        </form>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">{error.message}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
              {(applicants ?? []).map((a) => (
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
              {applicants?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No applicants yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSupabase } from '@/lib/supabase/auth';
import AssignmentActions from './AssignmentActions';

export const dynamic = 'force-dynamic';

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getServerSupabase();

  const [{ data: applicant }, { data: sessions }, { data: assignment }] = await Promise.all([
    supabase
      .from('applicants')
      .select('*')
      .eq('id', id)
      .maybeSingle(),
    supabase
      .from('session_capacity')
      .select('id, date, start_time, capacity, assigned_count, remaining')
      .order('start_time'),
    supabase
      .from('assignments')
      .select('id, session_id, assigned_at, notification_sent_at')
      .eq('applicant_id', id)
      .maybeSingle(),
  ]);

  if (!applicant) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin/applicants" className="text-sm text-gray-500 hover:text-gray-900 whitespace-nowrap">
          ← All applicants
        </Link>
        <span className="text-xs text-gray-400 truncate hidden sm:inline">{applicant.id}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 min-w-0 break-words">
            {applicant.child_name}
            {applicant.child_age && (
              <span className="ml-2 text-base font-normal text-gray-500">
                age {applicant.child_age}
              </span>
            )}
          </h1>
          <span className="shrink-0 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {applicant.status}
          </span>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Field label="Parent" value={applicant.parent_name} />
          <Field label="Email" value={applicant.email} />
          <Field label="Phone" value={applicant.phone} />
          <Field label="Preferred" value={applicant.preferred_session} />
          <Field label="Language" value={applicant.language} />
          <Field
            label="Submitted"
            value={new Date(applicant.created_at).toLocaleString()}
          />
        </dl>
        {applicant.message && (
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Message</div>
            <p className="text-gray-800 whitespace-pre-wrap">{applicant.message}</p>
          </div>
        )}
        {applicant.notes && (
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Internal notes
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{applicant.notes}</p>
          </div>
        )}
      </div>

      <AssignmentActions
        applicantId={applicant.id}
        currentSessionId={assignment?.session_id ?? null}
        notificationSentAt={assignment?.notification_sent_at ?? null}
        sessions={(sessions ?? []) as Array<{
          id: string;
          start_time: string;
          assigned_count: number | null;
          capacity: number;
          remaining: number | null;
        }>}
        currentStatus={applicant.status}
      />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-gray-900">{value ?? '—'}</dd>
    </div>
  );
}

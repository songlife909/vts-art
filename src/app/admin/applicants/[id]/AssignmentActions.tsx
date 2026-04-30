'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface SessionOption {
  id: string;
  start_time: string;
  assigned_count: number | null;
  capacity: number;
  remaining: number | null;
}

interface Props {
  applicantId: string;
  currentSessionId: string | null;
  notificationSentAt: string | null;
  sessions: SessionOption[];
  currentStatus: string;
}

export default function AssignmentActions({
  applicantId,
  currentSessionId,
  notificationSentAt,
  sessions,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const call = async (
    endpoint: string,
    body: Record<string, unknown>,
    successText: string
  ) => {
    setMessage(null);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage({ type: 'err', text: json.error || `Request failed (${res.status})` });
      return false;
    }
    setMessage({ type: 'ok', text: successText });
    startTransition(() => router.refresh());
    return true;
  };

  const assignTo = (sessionId: string) =>
    call('/api/admin/assign', { applicantId, sessionId }, 'Assigned');

  const unassign = () =>
    call('/api/admin/unassign', { applicantId }, 'Unassigned');

  const setStatus = (status: string) =>
    call('/api/admin/status', { applicantId, status }, `Status set to ${status}`);

  const notify = (kind: 'assignment' | 'waitlist' | 'rejected') =>
    call('/api/admin/notify', { applicantId, kind }, 'Notification sent');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Class assignment</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sessions.map((s) => {
            const isCurrent = s.id === currentSessionId;
            const full = (s.remaining ?? 0) <= 0 && !isCurrent;
            return (
              <button
                key={s.id}
                disabled={pending || full || isCurrent}
                onClick={() => assignTo(s.id)}
                className={`text-left p-4 rounded-xl border-2 transition ${
                  isCurrent
                    ? 'border-primary-500 bg-primary-50'
                    : full
                    ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                    : 'border-gray-200 hover:border-primary-400'
                }`}
              >
                <div className="font-semibold">{s.start_time}</div>
                <div className="text-sm text-gray-600">
                  {s.assigned_count ?? 0} / {s.capacity} assigned
                </div>
                {isCurrent && (
                  <div className="text-xs text-primary-700 mt-2 font-medium">
                    ✓ Current assignment
                  </div>
                )}
                {full && (
                  <div className="text-xs text-red-600 mt-2 font-medium">Full</div>
                )}
              </button>
            );
          })}
        </div>
        {currentSessionId && (
          <button
            onClick={unassign}
            disabled={pending}
            className="mt-4 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            Remove assignment
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
        <div className="flex flex-wrap gap-2">
          {['new', 'waitlist', 'rejected', 'cancelled', 'confirmed'].map((s) => (
            <button
              key={s}
              disabled={pending || currentStatus === s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                currentStatus === s
                  ? 'bg-gray-200 text-gray-700 border-gray-200 cursor-default'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Notify applicant by email</h2>
        {notificationSentAt && (
          <p className="text-xs text-gray-500 mb-3">
            Last sent: {new Date(notificationSentAt).toLocaleString()}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => notify('assignment')}
            disabled={pending || !currentSessionId}
            className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
          >
            Send confirmation
          </button>
          <button
            onClick={() => notify('waitlist')}
            disabled={pending}
            className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 disabled:opacity-50"
          >
            Send waitlist notice
          </button>
          <button
            onClick={() => notify('rejected')}
            disabled={pending}
            className="px-3 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            Send rejection
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === 'ok'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(key);
  }
  return _resend;
}

export const EMAIL_FROM = process.env.EMAIL_FROM || 'VTS <onboarding@resend.dev>';

export const ADMIN_NOTIFY_EMAILS = (process.env.ADMIN_NOTIFY_EMAILS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Escape minimal HTML special chars for safely interpolating user input
 * into email HTML bodies. We do NOT use innerHTML; we just use this in
 * pre-built template strings.
 */
export function escapeHtml(s: string | number | null | undefined): string {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

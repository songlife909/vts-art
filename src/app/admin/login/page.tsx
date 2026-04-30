'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const supabase = getBrowserSupabase();
    const redirectTo = `${window.location.origin}/admin/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } else {
      setStatus('sent');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 md:p-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your admin email. We&rsquo;ll send a one-time login link.
        </p>

        {status === 'sent' ? (
          <div className="p-4 bg-green-50 text-green-800 rounded-md">
            <p className="font-medium">Check your inbox</p>
            <p className="text-sm mt-1">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-700">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

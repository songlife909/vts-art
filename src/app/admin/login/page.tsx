'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const supabase = getBrowserSupabase();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } else {
      setStatus('idle');
      setStep('code');
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('verifying');
    setErrorMessage('');

    const supabase = getBrowserSupabase();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: 'email',
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 md:p-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          {step === 'email'
            ? 'Enter your admin email. We\u2019ll send a login code.'
            : `We sent a code to ${email}. Check your inbox.`}
        </p>

        {step === 'email' ? (
          <form onSubmit={sendCode} className="space-y-5">
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
              {status === 'sending' ? 'Sending\u2026' : 'Send code'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-5">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Login code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6,10}"
                maxLength={10}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
                placeholder="123456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 tracking-widest text-center text-xl font-mono"
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-700">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'verifying' || code.length < 6}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 disabled:opacity-50"
            >
              {status === 'verifying' ? 'Verifying\u2026' : 'Verify & sign in'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setStatus('idle');
                setErrorMessage('');
              }}
              className="block mx-auto text-sm text-gray-500 hover:text-gray-900"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

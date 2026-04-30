'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

type PreferredSession = '10:00' | '11:00' | 'either';

interface FormState {
  childName: string;
  childAge: string;
  parentName: string;
  email: string;
  phone: string;
  preferredSession: PreferredSession;
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  childName: '',
  childAge: '',
  parentName: '',
  email: '',
  phone: '',
  preferredSession: 'either',
  message: '',
  consent: false,
};

export default function ApplicationForm() {
  const { language } = useLanguage();
  const t = translations[language].contact.form;

  const [data, setData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent) return;
    setStatus('submitting');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          childAge: data.childAge ? Number(data.childAge) : null,
          language,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setData(initialState);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
            {t.childName} *
          </label>
          <input
            type="text"
            id="childName"
            name="childName"
            value={data.childName}
            onChange={handleChange}
            required
            placeholder={t.childNamePlaceholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">
            {t.childAge}
          </label>
          <input
            type="number"
            id="childAge"
            name="childAge"
            value={data.childAge}
            onChange={handleChange}
            min={3}
            max={18}
            placeholder={t.childAgePlaceholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
          {t.parentName} *
        </label>
        <input
          type="text"
          id="parentName"
          name="parentName"
          value={data.parentName}
          onChange={handleChange}
          required
          placeholder={t.parentNamePlaceholder}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder={t.emailPlaceholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t.phone} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            required
            placeholder={t.phonePlaceholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredSession" className="block text-sm font-medium text-gray-700">
          {t.preferredSession} *
        </label>
        <select
          id="preferredSession"
          name="preferredSession"
          value={data.preferredSession}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="either">{t.sessionOptionEither}</option>
          <option value="10:00">{t.sessionOption10}</option>
          <option value="11:00">{t.sessionOption11}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={data.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-start">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={data.consent}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
          {t.consent}
        </label>
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md">
          <p className="font-medium">{t.successTitle}</p>
          <p className="text-sm mt-1">{t.successBody}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          <p className="font-medium">{t.errorTitle}</p>
          <p className="text-sm mt-1">{t.errorBody}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || !data.consent}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? t.submitting : t.submit}
      </button>
    </form>
  );
}

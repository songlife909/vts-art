'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { useState } from 'react';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            {t.hero.title}
            <span className="block text-primary-600">{t.hero.subtitle}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* What is VTS Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.vts.title}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="prose prose-lg">
              <p className="text-gray-700">
                {t.vts.description}
              </p>
              <div className="mt-8 space-y-6">
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">{t.vts.exampleQuestions}</h3>
                  <ul className="space-y-3 text-gray-700">
                    {t.vts.questions.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 font-medium mr-2">{index + 1}.</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-secondary-700 mb-4">{t.vts.facilitatorRole}</h3>
                  <ul className="space-y-3 text-gray-700">
                    {t.vts.facilitatorActions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-secondary-600 font-medium mr-2">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/images/artworks/sunday-afternoon.jpg"
                  alt="A Sunday Afternoon on the Island of La Grande Jatte"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{t.vts.artworkTitle}</h3>
                <p className="text-sm opacity-90">{t.vts.artworkArtist}, {t.vts.artworkYear}</p>
              </div>
            </div>
          </div>
          
          {/* Class Picture Section */}
          <div className="relative h-[400px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center">
                <svg className="w-16 h-16 text-primary-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-primary-700 font-medium">{t.vts.classPictureDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/benefits-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.benefits.title}</h2>
            <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.items.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-primary-600 mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.teachingApproach.title}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">
              {t.teachingApproach.description}
            </p>
            <ul className="space-y-3 text-gray-700">
              {t.teachingApproach.steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Teacher Profile Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.teacher.title}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/images/teachers/eunjeong-choi.jpg"
                alt="Eunjung Choi - VTS Teacher"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={100}
                unoptimized
              />
            </div>
            <div className="prose prose-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.teacher.name}</h3>
              <p className="text-gray-600 mb-6">
                {t.teacher.bio}
              </p>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">{t.teacher.qualificationsTitle}</h4>
                <ul className="space-y-3 text-gray-700">
                  {t.teacher.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2">•</span>
                      {qualification}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Lesson Promotion Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.05]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">{t.pilot.title}</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-8" />
            <p className="text-xl text-white/90 mb-4">
              {t.pilot.description}
            </p>
            <p className="text-white/80 text-lg">
              {t.pilot.cta}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/contact-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder={t.contact.form.phonePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-800 rounded-md">
                  {language === 'en' ? 'Thank you for your message! We will get back to you soon.' : '메시지를 보내주셔서 감사합니다! 곧 연락드리겠습니다.'}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-800 rounded-md">
                  {language === 'en' ? 'Something went wrong. Please try again.' : '오류가 발생했습니다. 다시 시도해주세요.'}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (language === 'en' ? 'Sending...' : '전송 중...')
                  : t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

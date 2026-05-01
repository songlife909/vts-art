'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import RotatingPrompt from "@/components/RotatingPrompt";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

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
          
          {/* Hero Artwork — Ken Burns */}
          <div className="relative h-[400px] md:h-[480px] rounded-2xl shadow-lg overflow-hidden bg-black">
            <div className="absolute inset-0 animate-kenburns">
              <Image
                src="/images/hero/starry-night.jpg"
                alt="The Starry Night by Vincent van Gogh, 1889 (public domain)"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center max-w-3xl">
                <h3 className="animate-hero-prompt text-3xl md:text-5xl font-bold text-white leading-tight">
                  <RotatingPrompt prompts={t.vts.heroPrompts} />
                </h3>
                <p className="animate-fade-up-delay mt-4 text-sm md:text-base text-white/80 drop-shadow">
                  {t.vts.heroCaption}
                </p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="relative aspect-[3/4] w-full max-w-[25.2rem] mx-auto rounded-2xl overflow-hidden shadow-lg bg-gray-100">
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
            <ApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}

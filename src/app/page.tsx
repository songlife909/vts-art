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

      {/* Marketing Catchphrase Section */}
      <section className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-primary-50/40 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 text-primary-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em]">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>{t.marketing.eyebrow}</span>
            </span>
            <h2 className="mt-7 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.08]">
              <span className="block">{t.marketing.headline}</span>
              <span className="block mt-3 text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t.marketing.headlineAccent}
              </span>
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
              {t.marketing.subtitle}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {t.marketing.pillars.map((p, i) => {
              const pillarIcons = [
                // Harvard / research
                <path key="i0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />,
                // Art professional / palette
                <path key="i1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
                // Bonus / sparkle
                <path key="i2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L23 12l-5.714 2.143L15 21l-2.286-6.857L7 12l5.714-2.143L15 3z" />,
              ];
              return (
                <div
                  key={i}
                  className="group relative flex flex-col h-full bg-white rounded-2xl p-7 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {pillarIcons[i]}
                      </svg>
                    </span>
                    <span className="text-xs font-mono font-semibold text-gray-400 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="mt-5 inline-block self-start px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-100">
                    {p.label}
                  </span>
                  <h3 className="mt-3 text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
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

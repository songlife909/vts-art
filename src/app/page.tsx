import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Visual Thinking Strategy
            <span className="block text-primary-600">Group Lessons</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enhance children's language development through engaging group discussions about art.
          </p>
        </div>
      </section>

      {/* What is VTS Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What is Visual Thinking Strategy?</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="prose prose-lg">
              <p className="text-gray-700">
                Visual Thinking Strategy (VTS) is an educational method that uses art to develop critical thinking and communication skills. 
                Through carefully facilitated discussions about visual art, students learn to observe, analyze, and articulate their thoughts.
              </p>
              <div className="mt-8 space-y-6">
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">Example VTS Questions:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2">1.</span>
                      What's going on in this picture?
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2">2.</span>
                      What do you see that makes you say that?
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2">3.</span>
                      What more can we find?
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-secondary-700 mb-4">Facilitator's Role:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2">•</span>
                      Paraphrase comments neutrally
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2">•</span>
                      Point to observations
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2">•</span>
                      Link related comments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/images/artworks/sunday-afternoon.jpg"
                  alt="A Sunday Afternoon on the Island of La Grande Jatte by Georges Seurat"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold">A Sunday Afternoon on the Island of La Grande Jatte</h3>
                <p className="text-sm opacity-90">Georges Seurat, 1884</p>
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
                <p className="text-primary-700 font-medium">Add your VTS session photo here</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits for Children</h2>
            <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Language Development</h3>
              <p className="text-gray-600">Enhances vocabulary, descriptive language, and communication skills through structured discussions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Critical Thinking</h3>
              <p className="text-gray-600">Develops observation skills, evidence-based reasoning, and the ability to consider multiple perspectives.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-primary-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Social Skills</h3>
              <p className="text-gray-600">Fosters collaboration, active listening, and respectful discussion in a group setting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Approach Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teaching Approach</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">
              Our VTS sessions are led by experienced facilitators who create a safe and engaging environment for children to explore art and develop their thinking skills. 
              Each session is carefully structured to:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Encourage careful observation and detailed description
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Support evidence-based reasoning
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Foster respectful discussion and multiple perspectives
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Build confidence in expressing ideas
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Teacher Profile Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Teacher</h2>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Eunjung Choi</h3>
              <p className="text-gray-600 mb-6">
                A dedicated educator with extensive experience in Visual Thinking Strategy and art education.
              </p>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">Professional Experience</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    Over 15 years of experience in art education and VTS facilitation
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    Certified VTS Trainer with advanced certification from the Visual Thinking Strategies organization
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    Doctoral degree in Art Education from Penn State University
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    Former Art Education Director at Seoul Arts Center
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    Published researcher in the field of visual literacy and art education
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-medium mr-2">•</span>
                    International conference speaker on VTS implementation and best practices
                  </li>
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
            <h2 className="text-4xl font-bold text-white mb-6">Pilot Lesson Now Accepting Applications!</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-8" />
            <p className="text-xl text-white/90 mb-4">
              Join our exclusive pilot VTS session on May 16th in Vienna, Virginia. Limited slots available - don't miss this opportunity to experience the transformative power of Visual Thinking Strategy!
            </p>
            <p className="text-white/80 text-lg">
              Please use the form below to apply for the pilot session.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/contact-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-secondary-500 mx-auto rounded-full" />
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { Award, Users, Globe, ShieldCheck } from 'lucide-react';

export default function AboutPage({ onOpenAuth }) {
  return (
    <main>
      {/* Page Banner */}
      <div className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-accent font-heading font-semibold text-sm uppercase tracking-wider block mb-2">
            Learn English Platform
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            About Our Mission & Platform
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mt-3">
            Connecting ambitious global learners with native-speaking tutors and interactive video education for real-world English fluency.
          </p>
        </div>
      </div>

      <AboutSection onOpenAuth={onOpenAuth} />

      {/* Values Grid */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Global Network</h4>
              <p className="text-xs text-gray-600">Students and native tutors connected across 80+ countries worldwide.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-navy flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Verified Excellence</h4>
              <p className="text-xs text-gray-600">Every tutor undergoes background verification and certification checks.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Student First</h4>
              <p className="text-xs text-gray-600">Tailored learning speeds, interactive video lessons, and 1-on-1 focus.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-navy text-lg">Central Supabase Backend</h4>
              <p className="text-xs text-gray-600">Seamless integration ensuring teachers and students sync across web applications.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </main>
  );
}

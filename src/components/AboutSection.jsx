import React from 'react';
import { Target, Award, Users2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onOpenAuth }) {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Image Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/assets/img/about1.png"
                alt="About Learn English"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/home-img2.png";
                }}
              />
            </div>
            {/* Experience Highlight Pill */}
            <div className="absolute -bottom-8 -right-4 sm:bottom-6 sm:right-6 z-20 bg-accent text-white p-6 rounded-2xl shadow-xl max-w-[220px]">
              <span className="font-heading font-extrabold text-4xl block">10+</span>
              <span className="font-heading font-medium text-sm leading-tight block mt-1">Years Empowering Global English Learners</span>
            </div>
          </div>

          {/* Right Text Content Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="section-title">
              <span>About Learn English</span>
              <h2>Why Students Worldwide Choose Our English Platform</h2>
            </div>

            <p className="text-body text-base leading-relaxed">
              We provide a world-class environment designed specifically for anyone looking to achieve complete mastery of the English language. Whether you're preparing for job interviews, university studies, or international travel, our structured method yields real, lasting results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-navy text-lg mb-1">Fluency Focused</h4>
                  <p className="text-sm text-gray-600">Emphasis on natural conversation and real-world speaking confidence.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-navy text-lg mb-1">Certified Mentors</h4>
                  <p className="text-sm text-gray-600">Learn directly from verified expert native and fluent tutors.</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 pt-2 text-navy font-heading font-medium text-sm">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Interactive video lessons accessible immediately after student registration</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Direct booking with tutors registered across our global network</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Personalized feedback on grammar, accent, and vocabulary</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-one cursor-pointer"
              >
                Join Learn English Today
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Play, Sparkles, CheckCircle2, Star, Users, ArrowRight, Video } from 'lucide-react';

export default function HeroSection({ onOpenAuth, onOpenStudentPortal, loggedInUser }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-surface to-white">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-accent/20 text-accent font-heading font-semibold text-sm animate-bounce">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>#1 World-Standard Platform to Learn English</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-[1.15] tracking-tight">
              Master Fluent <span className="text-accent underline decoration-accent/30 underline-offset-8">English</span> With Live Expert Tutors
            </h1>

            {/* Subheading / Description */}
            <p className="text-body text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your speaking confidence, pronunciation, and vocabulary with personalized online tutoring and interactive video courses designed for real-world fluency.
            </p>

            {/* Key Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 text-navy font-heading font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>1-on-1 Native English Tutors</span>
              </div>
              <div className="flex items-center gap-2.5 text-navy font-heading font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Interactive Fluency Video Lessons</span>
              </div>
              <div className="flex items-center gap-2.5 text-navy font-heading font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Flexible Online Schedule</span>
              </div>
              <div className="flex items-center gap-2.5 text-navy font-heading font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>Verified Progress Certification</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {loggedInUser ? (
                <button
                  onClick={onOpenStudentPortal}
                  className="btn-one flex items-center gap-2 text-base px-8 py-4 cursor-pointer"
                >
                  <Video className="w-5 h-5" />
                  <span>Access Video Tutorials</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="btn-one flex items-center gap-2 text-base px-8 py-4 cursor-pointer"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => {
                  const mentorsEl = document.getElementById('mentors-section');
                  if (mentorsEl) mentorsEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-3 px-6 py-4 rounded-full border-2 border-navy text-navy font-heading font-semibold hover:bg-navy hover:text-white transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Explore Live Tutors</span>
              </button>
            </div>

            {/* Student Trust Stats */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 border-t border-gray-200">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="/assets/img/client02.png" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="/assets/img/client03.png" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="/assets/img/client04.png" alt="Student" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-navy text-white font-bold text-xs flex items-center justify-center">
                  +12k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-navy font-heading font-bold text-sm ml-1">4.9/5.0</span>
                </div>
                <p className="text-xs text-gray-500 font-sans">Trusted by over 12,000 active English learners</p>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img 
                  src="/assets/img/home-img1.png" 
                  alt="Learn English Student with Native Tutor" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/about1.png";
                  }}
                />
              </div>

              {/* Floating Card 1 - Live Tutors Badge */}
              <div className="absolute -top-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-xl bg-accent-light text-accent flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-navy text-sm">150+ Verified Tutors</h4>
                  <p className="text-xs text-gray-500">Native Speakers Active Now</p>
                </div>
              </div>

              {/* Floating Card 2 - Video Lessons Badge */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-navy text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Interactive Videos</h4>
                  <p className="text-xs text-gray-300">Fluency Practice Included</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

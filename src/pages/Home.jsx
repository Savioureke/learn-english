import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import MentorsSection from '../components/MentorsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import { ArrowRight, Video, Sparkles, Calendar, Gift } from 'lucide-react';

export default function Home({ onOpenAuth, loggedInUser }) {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection 
        onOpenAuth={onOpenAuth} 
        loggedInUser={loggedInUser} 
      />

      {/* Stats Ribbon */}
      <section className="bg-navy text-white py-12 border-y border-navy-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-accent">12k+</span>
              <p className="text-xs sm:text-sm text-gray-300 font-sans uppercase tracking-wider">Active Students</p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">150+</span>
              <p className="text-xs sm:text-sm text-gray-300 font-sans uppercase tracking-wider">Live Expert Tutors</p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-accent">98%</span>
              <p className="text-xs sm:text-sm text-gray-300 font-sans uppercase tracking-wider">Fluency Satisfaction</p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">4.9/5</span>
              <p className="text-xs sm:text-sm text-gray-300 font-sans uppercase tracking-wider">Average Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection onOpenAuth={onOpenAuth} />

      {/* Courses Catalog */}
      <CoursesSection onOpenAuth={onOpenAuth} />

      {/* Live Mentors Grid */}
      <MentorsSection onOpenAuth={onOpenAuth} />

      {/* Live 1-on-1 Trial Banner */}
      <section className="py-16 bg-gradient-to-r from-accent to-orange-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-heading font-bold mb-4 backdrop-blur-md">
            <Gift className="w-4 h-4 text-yellow-300" />
            <span>Special Student Welcome Offer</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white mb-4 max-w-3xl mx-auto leading-tight">
            Book a Free 20-Minute Trial Lesson with a Certified Tutor
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience our 1-on-1 Google Meet conversational coaching firsthand. Get your speaking level assessed and an individualized lesson plan with zero obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {loggedInUser ? (
              <Link
                to="/student-dashboard"
                className="bg-white text-navy hover:bg-navy hover:text-white font-heading font-bold text-base px-8 py-4 rounded-full shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-accent" />
                <span>Browse Tutors & Schedule Class</span>
              </Link>
            ) : (
              <button
                onClick={() => onOpenAuth('signup')}
                className="bg-navy hover:bg-navy-dark text-white font-heading font-bold text-base px-8 py-4 rounded-full shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Sign Up Free to Book Trial</span>
                <ArrowRight className="w-5 h-5 text-accent" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FaqSection />

      {/* Contact Form */}
      <ContactSection />
    </main>
  );
}

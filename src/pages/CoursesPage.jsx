import React from 'react';
import CoursesSection from '../components/CoursesSection';
import FaqSection from '../components/FaqSection';

export default function CoursesPage({ onOpenAuth }) {
  return (
    <main>
      <div className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-accent font-heading font-semibold text-sm uppercase tracking-wider block mb-2">
            Curriculum & Programs
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            English Fluency Courses
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mt-3">
            Choose from specialized modules covering conversation, business communication, pronunciation, and test preparation.
          </p>
        </div>
      </div>

      <CoursesSection onOpenAuth={onOpenAuth} />
      <FaqSection />
    </main>
  );
}

import React from 'react';
import MentorsSection from '../components/MentorsSection';

export default function MentorsPage({ onOpenAuth }) {
  return (
    <main>
      <div className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-accent font-heading font-semibold text-sm uppercase tracking-wider block mb-2">
            Live Database Directory
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Live Verified English Tutors
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mt-3">
            All teachers registered on our platform appear live right here. Select your mentor and book 1-on-1 speaking practice.
          </p>
        </div>
      </div>

      <MentorsSection onOpenAuth={onOpenAuth} />
    </main>
  );
}

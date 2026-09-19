import React from 'react';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <main>
      <div className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-accent font-heading font-semibold text-sm uppercase tracking-wider block mb-2">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Contact Learn English Team
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mt-3">
            Have questions about student enrollment, tutoring fees, or platform access? Send us a message!
          </p>
        </div>
      </div>

      <ContactSection />
    </main>
  );
}

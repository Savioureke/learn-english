import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "How do I start learning English on this platform?",
    answer: "Getting started is simple! Click 'Start Learning Now' or 'Sign Up' to create your free student account. Once logged in, you get immediate access to our video tutorial portal and live tutor directory."
  },
  {
    question: "What happens when I register as a student?",
    answer: "Your student registration is securely saved into our central Supabase database. As soon as you sign up and log in, your Student Video Portal is automatically unlocked with step-by-step English fluency video lessons."
  },
  {
    question: "Are the tutors native English speakers?",
    answer: "Yes! Our live tutors are certified native and expert English speakers (TEFL/CELTA credentials). You can view their qualifications, student ratings, hourly rates, and book 1-on-1 private lessons."
  },
  {
    question: "Is this connected to the English Tutor platform?",
    answer: "Yes, Learn English shares the exact same Supabase backend with the English Tutor platform. Tutors who register on English Tutor automatically appear on this website so students can find expert mentors."
  },
  {
    question: "Can I watch the video tutorials on my mobile phone?",
    answer: "Absolutely! The Student Video Portal and lessons are 100% mobile-responsive, allowing you to practice English speaking, pronunciation, and grammar on any device, anywhere."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white relative" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-title">
            <span>Frequently Asked Questions</span>
            <h2>Everything You Need to Know About Learn English</h2>
          </div>
          <p className="text-body text-base mt-3">
            Got questions? We're here to help you begin your journey to confident English speaking.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-accent bg-accent-light/30 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-lg text-navy cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-accent' : 'text-gray-400'}`} />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-navy transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-body leading-relaxed border-t border-accent/10 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

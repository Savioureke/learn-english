import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "How do I start learning English on this platform?",
    answer: "Getting started is simple! Click 'Start Learning Now' or 'Sign Up' to create your free student account. Once logged in, you can browse verified native tutors and book a Free 20-Minute Trial Lesson."
  },
  {
    question: "How do the 1-on-1 English lessons work?",
    answer: "All lessons are held 1-on-1 via Google Meet. Standard lessons are 45 minutes long, designed for intensive speaking practice, conversational fluency, pronunciation correction, and grammar refinement."
  },
  {
    question: "Are the tutors certified native English speakers?",
    answer: "Yes! Our live tutors are certified English instructors (TEFL/CELTA credentials). You can view their qualifications, student ratings, 45-min rates, and book classes or multi-class packages directly."
  },
  {
    question: "Can I try a class before buying a package?",
    answer: "Yes! Many verified instructors offer a Free 20-Minute Trial Session ($0.00) where they assess your current fluency level and design a customized lesson plan for your goals."
  },
  {
    question: "How do I join my scheduled Google Meet class?",
    answer: "Once booked, your upcoming classes and direct Google Meet classroom links will appear in your 'My Booked Classes' tab in the Student Dashboard. Simply click 'Join Google Meet Classroom' at your lesson time."
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

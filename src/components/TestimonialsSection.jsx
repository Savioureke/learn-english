import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'Software Engineer (Spain)',
    image: '/assets/img/client02.png',
    quote: 'Before Learn English, I used to freeze whenever I had to speak in English standup meetings. After 4 weeks of video lessons and 1-on-1 tutoring, I speak naturally without stuttering!',
    rating: 5,
    outcome: 'Promoted to International Lead'
  },
  {
    id: 2,
    name: 'Aisha Al-Hassan',
    role: 'Medical Student (UAE)',
    image: '/assets/img/client03.png',
    quote: 'The video tutorials on English accent training and pronunciation were game changers for me. Passed my IELTS speaking test with a Band 8.5 on my very first attempt!',
    rating: 5,
    outcome: 'Scored Band 8.5 on IELTS'
  },
  {
    id: 3,
    name: 'Kenji Sato',
    role: 'Marketing Specialist (Japan)',
    image: '/assets/img/client04.png',
    quote: 'Connecting with native tutors live on the platform helped me overcome my fear of making grammar mistakes. The tutors are encouraging, friendly, and super professional.',
    rating: 5,
    outcome: 'Fluent Business Speaker'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-title">
            <span>Student Success Stories</span>
            <h2>What Global Learners Say About Learn English</h2>
          </div>
          <p className="text-body text-base mt-3">
            Discover how thousands of students transformed their English speaking confidence and unlocked career and educational opportunities.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-accent/15 absolute top-6 right-6 group-hover:text-accent/30 transition-colors" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-body text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Outcome */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-accent/20"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/img/client02.png";
                    }}
                  />
                  <div>
                    <h4 className="font-heading font-bold text-navy text-sm leading-snug">{t.name}</h4>
                    <span className="text-xs text-gray-500 font-sans">{t.role}</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-heading font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{t.outcome}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

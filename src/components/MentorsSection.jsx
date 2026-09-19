import React, { useState, useEffect } from 'react';
import { fetchLiveTutors } from '../lib/supabase';
import { Star, CheckCircle, Award, Video, DollarSign, Calendar, MessageSquare } from 'lucide-react';

const DEFAULT_MENTORS = [
  {
    id: 'tch-201',
    full_name: 'Emma Watson',
    qualifications: 'TEFL Certified Native English Specialist from London (MA Applied Linguistics)',
    hourly_rate: 25,
    rating: 4.95,
    total_students: 480,
    avatar: '/assets/img/ins1.png',
    is_live_on_homepage: true,
    specialty: 'Conversational Fluency & Accent Reduction'
  },
  {
    id: 'tch-202',
    full_name: 'James Miller',
    qualifications: 'Business English Coach & Former Corporate Trainer (CELTA Certified)',
    hourly_rate: 30,
    rating: 4.92,
    total_students: 390,
    avatar: '/assets/img/ins2.png',
    is_live_on_homepage: true,
    specialty: 'Business English & Interview Prep'
  },
  {
    id: 'tch-203',
    full_name: 'Michael Davies',
    qualifications: 'IELTS Band 9 Specialist with 8+ Years Examiner Experience',
    hourly_rate: 28,
    rating: 4.88,
    total_students: 520,
    avatar: '/assets/img/ins-details.png',
    is_live_on_homepage: true,
    specialty: 'IELTS & TOEFL Exam Success'
  },
  {
    id: 'tch-204',
    full_name: 'Sarah Jenkins',
    qualifications: 'American English Pronunciation & Voice Clarity Master',
    hourly_rate: 22,
    rating: 4.90,
    total_students: 310,
    avatar: '/assets/img/client02.png',
    is_live_on_homepage: true,
    specialty: 'Pronunciation & Intonation'
  }
];

export default function MentorsSection({ onOpenAuth }) {
  const [mentors, setMentors] = useState(DEFAULT_MENTORS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const liveTeachers = await fetchLiveTutors();
        if (liveTeachers && liveTeachers.length > 0) {
          // Merge or prioritize live teachers from Supabase
          setMentors(liveTeachers);
        }
      } catch (err) {
        console.warn('Failed to fetch teachers from Supabase, using default roster:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="mentors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-title">
            <span>Expert Mentors & Tutors</span>
            <h2>Learn Directly From Top Native & Expert Tutors</h2>
          </div>
          <p className="text-body text-base mt-3">
            Every tutor on Learn English is verified, experienced, and dedicated to helping you achieve natural English fluency. Connect 1-on-1 for personalized guidance.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => {
            const avatarUrl = mentor.avatar || (index % 2 === 0 ? '/assets/img/ins1.png' : '/assets/img/ins2.png');
            const rating = mentor.rating || 4.9;
            const studentsCount = mentor.total_students || (150 + index * 40);
            const rate = mentor.hourly_rate || 25;

            return (
              <div
                key={mentor.id || index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Live Online Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-heading font-bold px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Available Live</span>
                </div>

                <div>
                  {/* Tutor Avatar */}
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent transition-colors shadow-md">
                    <img
                      src={avatarUrl}
                      alt={mentor.full_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/ins1.png";
                      }}
                    />
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-3">
                    <h3 className="font-heading font-bold text-xl text-navy group-hover:text-accent transition-colors">
                      {mentor.full_name}
                    </h3>
                    <p className="text-xs text-accent font-heading font-semibold uppercase tracking-wider mt-0.5">
                      {mentor.specialty || 'Native English Tutor'}
                    </p>
                  </div>

                  {/* Qualifications */}
                  <p className="text-xs text-gray-600 text-center leading-relaxed line-clamp-2 mb-4 bg-surface p-2.5 rounded-lg border border-gray-100">
                    {mentor.qualifications || 'TEFL & CELTA Certified Native English Speaker with extensive online tutoring experience.'}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-navy font-semibold">{rating}</span>
                    </div>

                    <div className="text-gray-500 font-medium">
                      <span>{studentsCount}+ Students</span>
                    </div>

                    <div className="font-heading font-bold text-navy text-sm">
                      <span className="text-accent">${rate}</span>/hr
                    </div>
                  </div>

                  {/* CTA Action */}
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="w-full py-2.5 rounded-xl bg-navy hover:bg-accent text-white font-heading font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book 1-on-1 Lesson</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Sync Notice Banner */}
        <div className="mt-12 bg-gradient-to-r from-navy to-navy-light text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">Directly Connected to English Tutor Platform</h4>
              <p className="text-sm text-gray-300">All registered tutors are automatically verified and accessible on Learn English in real-time.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenAuth('signup')}
            className="btn-one text-sm px-6 py-3 shrink-0 cursor-pointer"
          >
            Register as Student to Connect
          </button>
        </div>

      </div>
    </section>
  );
}

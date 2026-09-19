import React, { useState } from 'react';
import { Star, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';

const COURSES_DATA = [
  {
    id: 1,
    category: 'speaking',
    title: 'Everyday English Conversational Fluency',
    desc: 'Speak English naturally and effortlessly in daily situations, social settings, and casual conversations.',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks',
    students: '4,280 Learners',
    rating: 4.9,
    reviews: 312,
    image: '/assets/img/cat1.jpg',
    badge: 'Popular'
  },
  {
    id: 2,
    category: 'business',
    title: 'Business & Professional English Speaking',
    desc: 'Master executive presentation skills, negotiation phrases, emails, and job interview fluency.',
    level: 'Intermediate to Advanced',
    duration: '8 Weeks',
    students: '2,950 Professionals',
    rating: 4.95,
    reviews: 245,
    image: '/assets/img/cat2.jpg',
    badge: 'Career Focus'
  },
  {
    id: 3,
    category: 'pronunciation',
    title: 'English Pronunciation & Accent Reduction',
    desc: 'Eliminate hesitation, clear up sound errors, and master native English rhythm and intonation.',
    level: 'All Levels',
    duration: '4 Weeks',
    students: '3,810 Learners',
    rating: 4.88,
    reviews: 198,
    image: '/assets/img/cat3.jpg',
    badge: 'Fast Track'
  },
  {
    id: 4,
    category: 'exam',
    title: 'IELTS & TOEFL Speaking Mastery',
    desc: 'Target Band 8.0+ with insider strategies, real practice questions, and score-boosting techniques.',
    level: 'Advanced',
    duration: '6 Weeks',
    students: '1,890 Students',
    rating: 4.92,
    reviews: 164,
    image: '/assets/img/cat4.jpg',
    badge: 'Exam Prep'
  },
  {
    id: 5,
    category: 'grammar',
    title: 'Essential English Grammar for Fast Speaking',
    desc: 'Understand core sentence patterns effortlessly so you speak without constantly pausing to think.',
    level: 'Beginner',
    duration: '5 Weeks',
    students: '5,120 Learners',
    rating: 4.85,
    reviews: 410,
    image: '/assets/img/cat5.jpg',
    badge: 'Foundational'
  },
  {
    id: 6,
    category: 'speaking',
    title: 'Advanced Vocabulary & Idioms Masterclass',
    desc: 'Expand your word bank with 1,000+ modern English expressions, phrasal verbs, and native idioms.',
    level: 'Intermediate to Advanced',
    duration: '6 Weeks',
    students: '2,430 Learners',
    rating: 4.91,
    reviews: 215,
    image: '/assets/img/cat6.jpg',
    badge: 'Vocabulary'
  }
];

export default function CoursesSection({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = activeTab === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(course => course.category === activeTab);

  return (
    <section className="section-padding bg-surface relative" id="courses-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-title">
            <span>Explore Courses</span>
            <h2>Curated English Programs for Fast Results</h2>
          </div>
          <p className="text-body text-base mt-3">
            Select a learning track tailored to your goals—whether you want everyday conversation, career advancement, or exam success.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'speaking', label: 'Conversational Speaking' },
              { id: 'business', label: 'Business English' },
              { id: 'pronunciation', label: 'Pronunciation' },
              { id: 'exam', label: 'IELTS / TOEFL' },
              { id: 'grammar', label: 'Grammar & Vocab' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-heading font-semibold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-white text-navy hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col group border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/free-course.png";
                  }}
                />
                <span className="absolute top-4 left-4 bg-navy text-white text-xs font-heading font-bold px-3 py-1 rounded-full shadow-md">
                  {course.badge}
                </span>
                <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-navy text-xs font-heading font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  {course.duration}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="bg-accent-light text-accent font-semibold px-2.5 py-0.5 rounded-md">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-navy">{course.rating}</span>
                      <span className="text-gray-400 font-normal">({course.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-navy group-hover:text-accent transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-sm text-body mt-2 leading-relaxed line-clamp-2">
                    {course.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-sans">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{course.students}</span>
                  </div>

                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="flex items-center gap-1 text-accent font-heading font-bold text-sm hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

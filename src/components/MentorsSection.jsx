import React, { useState, useEffect } from 'react';
import { fetchLiveTutors, createLessonBooking } from '../lib/supabase';
import { Star, CheckCircle, Award, Video, DollarSign, Calendar, MessageSquare, Gift, ExternalLink, X, Send, User, Mail, Phone } from 'lucide-react';

const DEFAULT_MENTORS = [
  {
    id: 'tch-201',
    full_name: 'Emma Watson',
    qualifications: 'TEFL Certified Native English Specialist from London (MA Applied Linguistics)',
    hourly_rate: 25,
    rate_per_45_min: 25,
    rating: 4.95,
    total_students: 480,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    is_live_on_homepage: true,
    offers_free_trial: true,
    meeting_platform: 'Google Meet'
  },
  {
    id: 'tch-202',
    full_name: 'James Miller',
    qualifications: 'Business English Coach & Former Corporate Trainer (CELTA Certified)',
    hourly_rate: 30,
    rate_per_45_min: 30,
    rating: 4.92,
    total_students: 390,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    is_live_on_homepage: true,
    offers_free_trial: true,
    meeting_platform: 'Google Meet'
  },
  {
    id: 'tch-203',
    full_name: 'Michael Davies',
    qualifications: 'IELTS Band 9 Specialist with 8+ Years Examiner Experience',
    hourly_rate: 28,
    rate_per_45_min: 28,
    rating: 4.88,
    total_students: 520,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    is_live_on_homepage: true,
    offers_free_trial: false,
    meeting_platform: 'Google Meet'
  },
  {
    id: 'tch-204',
    full_name: 'Sarah Jenkins',
    qualifications: 'American English Pronunciation & Voice Clarity Master',
    hourly_rate: 22,
    rate_per_45_min: 22,
    rating: 4.90,
    total_students: 310,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    is_live_on_homepage: true,
    offers_free_trial: true,
    meeting_platform: 'Google Meet'
  }
];

export default function MentorsSection({ onOpenAuth }) {
  const [mentors, setMentors] = useState(DEFAULT_MENTORS);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [bookingTeacher, setBookingTeacher] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [bookingType, setBookingType] = useState('free_trial');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00 (2:00 PM)');
  const [lessonTopic, setLessonTopic] = useState('1-on-1 Spoken Fluency');
  const [message, setMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const liveTeachers = await fetchLiveTutors();
        if (liveTeachers && liveTeachers.length > 0) {
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

  const handleOpenBooking = (teacher) => {
    setBookingTeacher(teacher);
    setBookingType(teacher.offers_free_trial !== false ? 'free_trial' : 'single_45');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !bookingTeacher) return;

    setIsSubmitting(true);
    const rate = bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25;

    const res = await createLessonBooking({
      teacher_id: bookingTeacher.id,
      teacher_name: bookingTeacher.full_name,
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone,
      hourly_rate: rate,
      booking_type: bookingType,
      lesson_topic: lessonTopic,
      message,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
    });

    setIsSubmitting(false);
    if (res.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingTeacher(null);
        setStudentName('');
        setStudentEmail('');
        setStudentPhone('');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="mentors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-title">
            <span>Verified 1-on-1 English Mentors</span>
            <h2>Book 45-Min Lessons or a Free 20-Min Trial on Google Meet</h2>
          </div>
          <p className="text-body text-base mt-3">
            Every tutor is verified, TEFL-trained, and dedicated to helping you achieve fluent, confident English. Choose a tutor below to schedule your trial or lesson.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => {
            const avatarUrl = mentor.avatar || (index % 2 === 0 ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80');
            const rating = mentor.rating || 4.9;
            const studentsCount = mentor.total_students || (150 + index * 40);
            const rate = mentor.rate_per_45_min || mentor.hourly_rate || 25;
            const hasTrial = mentor.offers_free_trial !== false;

            return (
              <div
                key={mentor.id || index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Avatar & Badges */}
                  <div className="relative mb-5 overflow-hidden rounded-2xl aspect-square bg-gray-100">
                    <img
                      src={avatarUrl}
                      alt={mentor.full_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {hasTrial ? (
                        <span className="bg-emerald-500 text-white text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Free Trial
                        </span>
                      ) : <span></span>}

                      <span className="bg-navy/90 text-white text-[10px] font-heading font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Video className="w-3 h-3 text-emerald-400" /> Google Meet
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-bold text-lg text-navy group-hover:text-accent transition-colors">
                    {mentor.full_name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {mentor.qualifications || 'Certified Communicative Spoken English Coach & TESOL Specialist'}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-amber-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {rating}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-normal">{studentsCount}+ students</span>
                  </div>
                </div>

                {/* Bottom Rate & CTA */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-heading font-bold">Class Rate</span>
                    <span className="font-heading font-bold text-base text-navy">
                      ${rate} <span className="text-xs font-normal text-gray-500">/ 45 min</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(mentor)}
                    className="px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{hasTrial ? 'Book Free Trial' : 'Book 45-Min'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Booking Modal */}
      {bookingTeacher && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-gray-100 p-6 sm:p-8 space-y-5">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={bookingTeacher.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                  alt={bookingTeacher.full_name}
                  className="w-12 h-12 rounded-xl object-cover border"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Google Meet Lesson
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Book {bookingTeacher.full_name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setBookingTeacher(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-lg">Booking Confirmed!</h4>
                <p className="text-xs text-emerald-800">
                  Your Google Meet lesson invitation has been scheduled.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                
                {/* Booking Options */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase font-heading">
                    Select Class Option:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bookingTeacher.offers_free_trial !== false && (
                      <label 
                        onClick={() => setBookingType('free_trial')}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                          bookingType === 'free_trial' ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mentors_book_type"
                          checked={bookingType === 'free_trial'}
                          onChange={() => setBookingType('free_trial')}
                        />
                        <span>Free 20-Min Trial ($0)</span>
                      </label>
                    )}

                    <label 
                      onClick={() => setBookingType('single_45')}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                        bookingType === 'single_45' ? 'bg-accent/10 border-accent font-bold text-accent' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mentors_book_type"
                        checked={bookingType === 'single_45'}
                        onChange={() => setBookingType('single_45')}
                      />
                      <span>1 Class 45-Min (${bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25})</span>
                    </label>
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Henry"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="henry@gmail.com"
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+1 555 0000"
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Time Slot</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl"
                    >
                      <option value="10:00 (10:00 AM)">10:00 AM</option>
                      <option value="14:00 (2:00 PM)">02:00 PM</option>
                      <option value="18:00 (6:00 PM)">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Fluency Focus</label>
                  <input
                    type="text"
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="Speaking confidence, conversation, grammar"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingTeacher(null)}
                    className="px-4 py-2 text-xs font-heading font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Confirm Class on Google Meet'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}

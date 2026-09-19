import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Video, Calendar, Clock, Award, Shield, User, 
  Star, Gift, CheckCircle2, ChevronRight, Sparkles, Send, Mail, Phone, RefreshCw
} from 'lucide-react';
import { fetchLiveTutors, createLessonBooking, supabase } from '../lib/supabase';

export default function StudentDashboard({ loggedInUser, onOpenAuth }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'tutors';

  const [activeTab, setActiveTab] = useState(initialTab === 'courses' ? 'tutors' : initialTab); // 'tutors' | 'bookings'
  const [liveTutors, setLiveTutors] = useState([]);
  const [studentBookings, setStudentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);
  const [bookingType, setBookingType] = useState('free_trial');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00 (2:00 PM)');
  const [lessonTopic, setLessonTopic] = useState('1-on-1 Spoken Fluency & Conversation');
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const tutors = await fetchLiveTutors();
        if (tutors && tutors.length > 0) {
          setLiveTutors(tutors);
        }

        // Fetch bookings for this student
        const userEmail = (loggedInUser?.email || '').toLowerCase().trim();
        const { data: bookings } = await supabase
          .from('lesson_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (bookings) {
          const myOnly = bookings.filter(b => 
            (b.student_email && b.student_email.toLowerCase() === userEmail) ||
            (b.student_name && loggedInUser?.full_name && b.student_name.toLowerCase().includes(loggedInUser.full_name.toLowerCase()))
          );
          setStudentBookings(myOnly.length > 0 ? myOnly : bookings.slice(0, 4));
        }
      } catch (e) {
        console.warn('Error loading dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [loggedInUser]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleOpenBookingModal = (teacher) => {
    setSelectedTeacherForBooking(teacher);
    setBookingType(teacher.offers_free_trial !== false ? 'free_trial' : 'single_45');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedTeacherForBooking) return;

    setIsSubmitting(true);
    const rate = selectedTeacherForBooking.rate_per_45_min || selectedTeacherForBooking.hourly_rate || 25;

    const res = await createLessonBooking({
      teacher_id: selectedTeacherForBooking.id,
      teacher_name: selectedTeacherForBooking.full_name,
      student_name: loggedInUser?.full_name || 'Henry',
      student_email: loggedInUser?.email || 'henry@gmail.com',
      student_phone: loggedInUser?.phone || '+1 555 0000',
      hourly_rate: rate,
      booking_type: bookingType,
      lesson_topic: lessonTopic,
      message: specialNotes,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
    });
    setIsSubmitting(false);

    if (res.success) {
      setBookingSuccess(true);
      if (res.booking) {
        setStudentBookings(prev => [res.booking, ...prev]);
      }
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedTeacherForBooking(null);
        handleTabChange('bookings');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white rounded-3xl p-5 sm:p-10 shadow-xl mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-accent text-white flex items-center justify-center font-extrabold text-xl sm:text-3xl shadow-lg border-2 border-white/30 shrink-0 mt-1 sm:mt-0">
                {loggedInUser?.full_name ? loggedInUser.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-heading font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <Shield className="w-3 h-3 text-emerald-400" /> Student Portal
                  </span>
                  <span className="bg-white/10 text-white/90 text-[11px] sm:text-xs font-heading px-2.5 py-0.5 rounded-full truncate max-w-[210px] sm:max-w-none">
                    Account: {loggedInUser?.email || 'Active Student'}
                  </span>
                </div>
                <h1 className="text-xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  Welcome back, <span className="text-white">{loggedInUser?.full_name || 'Student'}</span>!
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                  Browse verified English teachers below to book <strong>Free 20-Min Trials</strong> or structured <strong>45-Min Lessons on Google Meet</strong>.
                </p>
              </div>
            </div>

            {/* Header Right Action Badges */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                onClick={() => handleTabChange('tutors')}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Tutor</span>
              </button>
              <button
                onClick={() => handleTabChange('bookings')}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>My Classes ({studentBookings.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15">
            <div className="bg-white/10 rounded-2xl p-3 sm:p-3.5 backdrop-blur-xs">
              <div className="text-[11px] sm:text-xs text-gray-300 font-heading">Available Tutors</div>
              <div className="text-base sm:text-2xl font-bold font-heading text-white mt-0.5">
                {liveTutors.length} Live Instructors
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 sm:p-3.5 backdrop-blur-xs">
              <div className="text-[11px] sm:text-xs text-gray-300 font-heading">Lesson Platform</div>
              <div className="text-base sm:text-2xl font-bold font-heading text-emerald-300 mt-0.5">
                Google Meet
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 sm:p-3.5 backdrop-blur-xs">
              <div className="text-[11px] sm:text-xs text-gray-300 font-heading">Trial Session</div>
              <div className="text-base sm:text-2xl font-bold font-heading text-amber-300 mt-0.5">
                Free 20 Mins ($0)
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 sm:p-3.5 backdrop-blur-xs">
              <div className="text-[11px] sm:text-xs text-gray-300 font-heading">Lesson Duration</div>
              <div className="text-base sm:text-2xl font-bold font-heading text-blue-300 mt-0.5">
                45 Mins / Class
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs - Responsive 2-Column Grid (Zero Mobile Cutoff) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {[
            { 
              id: 'tutors', 
              labelDesktop: '1. Browse & Book Live Tutors', 
              labelMobile: '1. Browse Tutors',
              icon: Video, 
              badge: `${liveTutors.length} Live` 
            },
            { 
              id: 'bookings', 
              labelDesktop: '2. My Booked Classes & Google Meet Links', 
              labelMobile: '2. Booked Classes',
              icon: Calendar, 
              badge: `${studentBookings.length}` 
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center justify-center sm:justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-heading font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-md ring-2 ring-navy/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                  <span className="hidden sm:inline truncate">{tab.labelDesktop}</span>
                  <span className="sm:hidden truncate">{tab.labelMobile}</span>
                </div>
                {tab.badge && (
                  <span className={`ml-1.5 sm:ml-2 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: LIVE TUTORS DIRECTORY ================= */}
        {activeTab === 'tutors' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-heading font-bold text-accent tracking-wider">
                  Verified 1-on-1 English Instructors
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy mt-1">
                  Select an Instructor & Book Your Next Class
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  All lessons take place on <strong>Google Meet</strong>. Choose a tutor below to schedule a <strong>Free 20-Min Trial</strong> or <strong>45-Min Standard Lesson</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0">
                <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free 20-Min Trials Available on Eligible Profiles</span>
              </div>
            </div>

            {/* Tutors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveTutors.map((tutor) => {
                const rate = tutor.rate_per_45_min || tutor.hourly_rate || 25;
                const hasTrial = tutor.offers_free_trial !== false;

                return (
                  <div 
                    key={tutor.id}
                    className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        {hasTrial ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Gift className="w-3 h-3 text-emerald-600" /> Free 20-Min Trial
                          </span>
                        ) : (
                          <span className="text-[10px] bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-full">
                            45-Min Standard
                          </span>
                        )}

                        <span className="text-[10px] bg-navy/90 text-white font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                          <Video className="w-3 h-3 text-emerald-400" /> Google Meet
                        </span>
                      </div>

                      {/* Avatar & Details */}
                      <div className="flex items-start gap-3.5">
                        <img
                          src={tutor.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
                          alt={tutor.full_name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <h3 className="text-lg font-bold font-heading text-navy group-hover:text-accent transition-colors truncate">
                            {tutor.full_name}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {tutor.qualifications || 'Certified Communicative Spoken English Coach & TESOL Specialist'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold pt-0.5">
                            <span className="flex items-center gap-0.5">
                              <Star className="w-3.5 h-3.5 fill-current" /> {tutor.rating || 5.0}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500 font-normal">{tutor.total_students || 15}+ students</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-heading font-bold block">Class Rate</span>
                        <strong className="text-lg font-bold font-heading text-navy">
                          ${rate.toFixed(2)}
                          <span className="text-xs font-normal text-gray-500"> / 45 min</span>
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/book-tutor/${tutor.id}`}
                          className="px-3.5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white font-heading font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Details</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenBookingModal(tutor)}
                          className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{hasTrial ? 'Book Trial' : 'Book Class'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: MY BOOKED CLASSES & GOOGLE MEET LINKS ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy">
                  My Booked 1-on-1 Classes & Google Meet Links
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Click the Google Meet button below at your scheduled class time to enter your live video classroom.
                </p>
              </div>

              <button
                onClick={() => handleTabChange('tutors')}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                + Book Another Class
              </button>
            </div>

            {studentBookings.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
                <Calendar className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 mx-auto" />
                <h3 className="text-lg sm:text-xl font-bold font-heading text-navy">No scheduled classes yet</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  Browse our verified English tutors to schedule your Free 20-Minute Trial or 45-Minute coaching lesson.
                </p>
                <button
                  onClick={() => handleTabChange('tutors')}
                  className="mt-3 px-6 py-2.5 rounded-xl bg-accent text-white font-heading font-bold text-xs cursor-pointer"
                >
                  Browse Available Tutors Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {studentBookings.map((b) => {
                  const isFreeTrial = b.booking_type === 'free_trial' || b.payment_status === 'free_trial';
                  const meetLink = b.meeting_link || 'https://meet.google.com/eng-live-class';

                  return (
                    <div 
                      key={b.id}
                      className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
                            isFreeTrial ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isFreeTrial ? 'Free 20-Min Trial Class' : `${b.package_lessons_total || 1}-Class Package (45 Min)`}
                          </span>

                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            b.lesson_status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.lesson_status === 'confirmed' || b.lesson_status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                          }`}>
                            Lesson Status: {b.lesson_status || 'Inquiry'}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-heading text-navy">
                          {b.lesson_topic || 'Spoken English & Conversational Coaching'}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600">
                          Tutor: <strong>{b.teacher_name}</strong> • Rate: ${b.hourly_rate}/45 min
                        </p>

                        {b.session_notes && (
                          <div className="text-xs text-gray-500 bg-slate-50 p-3 rounded-xl border border-gray-100">
                            <strong>Session Schedule & Notes:</strong> {b.session_notes}
                          </div>
                        )}
                      </div>

                      {/* Right Action: Launch Google Meet */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 items-stretch sm:items-end">
                        <a
                          href={meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Google Meet Classroom</span>
                        </a>

                        <span className="text-[11px] text-gray-400 text-center sm:text-right block font-mono">
                          Meeting ID: {meetLink.replace('https://meet.google.com/', '')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Direct Booking Modal (If triggered from tutor card) */}
      {selectedTeacherForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto my-auto">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTeacherForBooking.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                  alt={selectedTeacherForBooking.full_name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-gray-100"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Google Meet Class
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy mt-0.5">
                    Book {selectedTeacherForBooking.full_name}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeacherForBooking(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-8 bg-emerald-50 text-emerald-900 rounded-3xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-xl text-emerald-950">Lesson Booking Confirmed!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your Google Meet lesson invitation has been created. Redirecting to your Booked Classes tab...
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                
                {/* Booking Type Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase font-heading">
                    Select Class Option:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedTeacherForBooking.offers_free_trial !== false && (
                      <label 
                        onClick={() => setBookingType('free_trial')}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                          bookingType === 'free_trial' ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950 ring-2 ring-emerald-400/20' : 'bg-slate-50 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dash_book_type"
                          checked={bookingType === 'free_trial'}
                          onChange={() => setBookingType('free_trial')}
                        />
                        <div>
                          <span className="block font-bold">Free 20-Min Trial ($0.00)</span>
                          <span className="text-[10px] text-gray-500 font-normal">Level assessment on Google Meet</span>
                        </div>
                      </label>
                    )}

                    <label 
                      onClick={() => setBookingType('single_45')}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                        bookingType === 'single_45' ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20' : 'bg-slate-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dash_book_type"
                        checked={bookingType === 'single_45'}
                        onChange={() => setBookingType('single_45')}
                      />
                      <div>
                        <span className="block font-bold">1 Class (45 Mins)</span>
                        <span className="text-[10px] text-gray-500 font-normal">${selectedTeacherForBooking.rate_per_45_min || selectedTeacherForBooking.hourly_rate || 25}.00</span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setBookingType('package_5')}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                        bookingType === 'package_5' ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20' : 'bg-slate-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dash_book_type"
                        checked={bookingType === 'package_5'}
                        onChange={() => setBookingType('package_5')}
                      />
                      <div>
                        <span className="block font-bold">5 Classes Package</span>
                        <span className="text-[10px] text-gray-500 font-normal">5 x 45-min (5% bundle savings)</span>
                      </div>
                    </label>

                    <label 
                      onClick={() => setBookingType('package_10')}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                        bookingType === 'package_10' ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20' : 'bg-slate-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dash_book_type"
                        checked={bookingType === 'package_10'}
                        onChange={() => setBookingType('package_10')}
                      />
                      <div>
                        <span className="block font-bold">10 Classes Package</span>
                        <span className="text-[10px] text-gray-500 font-normal">10 x 45-min (10% bundle savings)</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Time</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl"
                    >
                      <option value="10:00 (10:00 AM)">10:00 AM</option>
                      <option value="14:00 (2:00 PM)">02:00 PM</option>
                      <option value="18:00 (6:00 PM)">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Fluency Goal / Focus</label>
                  <input
                    type="text"
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="Speaking confidence, interview prep, accent"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTeacherForBooking(null)}
                    className="px-4 py-2 text-xs font-heading font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Confirm Booking on Google Meet'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  X, Play, CheckCircle2, Lock, Sparkles, BookOpen, Clock, 
  Award, Shield, User, Video, Calendar, Gift, HelpCircle, 
  Check, RefreshCw, Star, ExternalLink, Mail, Phone
} from 'lucide-react';
import { TRAINING_MODULES } from '../data/modulesData';
import { fetchLiveTutors, createLessonBooking, supabase } from '../lib/supabase';

export default function StudentPortal({ isOpen, onClose, studentUser }) {
  const [activeTab, setActiveTab] = useState('tutors'); // 'tutors' | 'my-bookings' | 'curriculum'
  const [activeVideo, setActiveVideo] = useState(null);
  const [completedModules, setCompletedModules] = useState([1]);
  const [quizScores, setQuizScores] = useState({});
  const [liveTutors, setLiveTutors] = useState([]);
  const [studentBookings, setStudentBookings] = useState([]);
  
  // Active quiz state
  const [activeQuizModule, setActiveQuizModule] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Booking Modal State
  const [bookingTeacher, setBookingTeacher] = useState(null);
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
        const tutors = await fetchLiveTutors();
        if (tutors && tutors.length > 0) {
          setLiveTutors(tutors);
        }

        // Fetch bookings for this student
        const userEmail = (studentUser?.email || '').toLowerCase().trim();
        const { data: bookings } = await supabase
          .from('lesson_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (bookings) {
          const myOnly = bookings.filter(b => 
            (b.student_email && b.student_email.toLowerCase() === userEmail) ||
            (b.student_name && studentUser?.full_name && b.student_name.toLowerCase().includes(studentUser.full_name.toLowerCase()))
          );
          setStudentBookings(myOnly.length > 0 ? myOnly : bookings.slice(0, 3));
        }
      } catch (e) {
        console.warn('Could not load data:', e);
      }
    }
    if (isOpen) {
      loadData();
    }
  }, [isOpen, studentUser]);

  if (!isOpen) return null;

  const handleOpenQuiz = (mod) => {
    setActiveQuizModule(mod);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (qId, idx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuizModule) return;
    const questions = activeQuizModule.quiz.questions;
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    const passed = calculatedScore >= (activeQuizModule.quiz.passingScore || 66);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (passed) {
      if (!completedModules.includes(activeQuizModule.number)) {
        setCompletedModules(prev => [...prev, activeQuizModule.number]);
      }
      setQuizScores(prev => ({ ...prev, [activeQuizModule.number]: calculatedScore }));
    }
  };

  const handleBookTutor = async (e) => {
    e.preventDefault();
    if (!bookingTeacher) return;

    setIsSubmitting(true);
    const rate = bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25;

    const res = await createLessonBooking({
      teacher_id: bookingTeacher.id,
      teacher_name: bookingTeacher.full_name,
      student_name: studentUser?.full_name || 'Henry',
      student_email: studentUser?.email || 'henry@gmail.com',
      student_phone: studentUser?.phone || '+1 555 0000',
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
        setBookingTeacher(null);
        setActiveTab('my-bookings');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white p-5 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg font-bold text-xl shrink-0">
                {studentUser?.full_name ? studentUser.full_name.charAt(0).toUpperCase() : 'H'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Student Portal Active
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  Welcome back, {studentUser?.full_name || 'Henry'}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  Browse verified English teachers below to book <strong>Free 20-Min Trials</strong> or structured <strong>45-Min Lessons on Google Meet</strong>.
                </p>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shrink-0 text-center sm:text-right">
              <span className="text-xs text-gray-300 block font-heading">Booked Classes</span>
              <span className="font-heading font-bold text-lg text-accent">
                {studentBookings.length} Active Slots
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-gray-200 bg-surface px-6 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tutors')}
            className={`py-3.5 px-5 font-heading font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tutors'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>1. Browse & Book Live Tutors ({liveTutors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`py-3.5 px-5 font-heading font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'my-bookings'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>2. My Booked Classes & Google Meet Links ({studentBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3.5 px-5 font-heading font-bold text-xs flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>3. 10-Module Spoken Fluency Course</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-surface">
          
          {/* TAB 1: LIVE TUTORS (IMMEDIATELY VISIBLE UPON SIGN IN) */}
          {activeTab === 'tutors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Verified English Teachers Available for Google Meet Classes
                  </h3>
                  <p className="text-xs text-gray-500">
                    Immediately select an instructor to book your free 20-min trial or 45-min package.
                  </p>
                </div>
                <span className="text-xs font-heading font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                  <Gift className="w-4 h-4 text-emerald-600" /> Free 20-Min Trials Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {liveTutors.map((t) => {
                  const rate = t.rate_per_45_min || t.hourly_rate || 25;
                  const hasTrial = t.offers_free_trial !== false;

                  return (
                    <div key={t.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {hasTrial ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Gift className="w-3 h-3 text-emerald-600" /> Free 20-Min Trial
                            </span>
                          ) : <span className="text-[10px] text-gray-500 font-mono">45-Min Standard</span>}

                          <span className="text-[10px] bg-navy/90 text-white font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Video className="w-3 h-3 text-emerald-400" /> Google Meet
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={t.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'}
                            alt={t.full_name}
                            className="w-13 h-13 rounded-xl object-cover border"
                          />
                          <div>
                            <h4 className="font-heading font-bold text-sm text-navy">{t.full_name}</h4>
                            <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-current" /> {t.rating || 5.0} ({t.total_students || 15}+ students)
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {t.qualifications || 'Certified Communicative Spoken English Coach & TESOL Specialist'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-heading font-bold uppercase">Rate</span>
                          <strong className="text-sm font-heading font-bold text-navy">${rate} / 45 min</strong>
                        </div>

                        <button
                          onClick={() => {
                            setBookingTeacher(t);
                            setBookingType(hasTrial ? 'free_trial' : 'single_45');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold shadow-xs transition-all cursor-pointer"
                        >
                          {hasTrial ? 'Book Free Trial' : 'Book Class'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MY BOOKINGS & GOOGLE MEET LINKS */}
          {activeTab === 'my-bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    My Scheduled Google Meet Classes
                  </h3>
                  <p className="text-xs text-gray-500">
                    Access your live Google Meet video class links and session schedules.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('tutors')}
                  className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-heading font-bold"
                >
                  + Book Another Tutor
                </button>
              </div>

              {studentBookings.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-2">
                  <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
                  <h4 className="font-heading font-bold text-base text-navy">No scheduled classes yet</h4>
                  <p className="text-xs text-gray-500">
                    Pick a tutor from the directory to book your free 20-minute trial.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studentBookings.map((b) => {
                    const isTrial = b.booking_type === 'free_trial';
                    const meetLink = b.meeting_link || 'https://meet.google.com/eng-live-class';

                    return (
                      <div 
                        key={b.id}
                        className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                              isTrial ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {isTrial ? 'Free 20-Min Trial' : `${b.package_lessons_total || 1}-Class Package (45 Min)`}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                              Status: {b.lesson_status || 'Inquiry'}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-base text-navy">
                            {b.lesson_topic || 'Spoken English Coaching'}
                          </h4>
                          <p className="text-xs text-gray-600">
                            Instructor: <strong>{b.teacher_name}</strong> • ${b.hourly_rate}/45 min
                          </p>
                          {b.session_notes && (
                            <p className="text-[11px] text-gray-500 bg-surface p-2 rounded-lg border">
                              {b.session_notes}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 flex flex-col items-end gap-1">
                          <a
                            href={meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <Video className="w-4 h-4" />
                            <span>Join Google Meet Class</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[10px] text-gray-400 font-mono">
                            Room: {meetLink.replace('https://meet.google.com/', '')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: 10-MODULE CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {activeVideo && (
                <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-accent font-mono font-bold uppercase">Now Watching Module {activeVideo.number}</span>
                      <h3 className="font-heading font-bold text-lg text-white">{activeVideo.title}</h3>
                    </div>
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg cursor-pointer"
                    >
                      Close Video
                    </button>
                  </div>

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={activeVideo.embedUrl}
                      title={activeVideo.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRAINING_MODULES.map((mod) => {
                  const isDone = completedModules.includes(mod.number);

                  return (
                    <div
                      key={mod.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isDone ? 'bg-white border-emerald-300' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Module {mod.number}</span>
                            <span className="text-[10px] bg-surface text-gray-600 px-2 py-0.5 rounded font-medium">{mod.duration}</span>
                            {isDone && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> Passed
                              </span>
                            )}
                          </div>
                          <h4 className="font-heading font-bold text-base text-navy mt-1">{mod.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{mod.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => setActiveVideo(mod)}
                          className="px-3 py-1.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-heading font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" /> Watch Video
                        </button>

                        <button
                          onClick={() => handleOpenQuiz(mod)}
                          className="px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-heading font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" /> Take Quiz
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Booking Modal in Portal */}
      {bookingTeacher && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 max-h-[88vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={bookingTeacher.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
                  alt={bookingTeacher.full_name}
                  className="w-12 h-12 rounded-xl object-cover border"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Google Meet Class
                  </span>
                  <h3 className="font-heading font-bold text-base text-navy">
                    Book {bookingTeacher.full_name}
                  </h3>
                </div>
              </div>
              <button onClick={() => setBookingTeacher(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-base">Class Booking Confirmed!</h4>
                <p className="text-xs text-emerald-800">
                  Your Google Meet lesson invitation has been created.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookTutor} className="space-y-3.5">
                
                {/* Booking Options: Free Trial, 1 Class, 5 Classes, 10 Classes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase font-heading">
                    Select Package / Class Option:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bookingTeacher.offers_free_trial !== false && (
                      <label 
                        onClick={() => setBookingType('free_trial')}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                          bookingType === 'free_trial' ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="portal_book_type"
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
                        name="portal_book_type"
                        checked={bookingType === 'single_45'}
                        onChange={() => setBookingType('single_45')}
                      />
                      <span>1 Class 45-Min (${bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25})</span>
                    </label>

                    <label 
                      onClick={() => setBookingType('package_5')}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                        bookingType === 'package_5' ? 'bg-accent/10 border-accent font-bold text-accent' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="portal_book_type"
                        checked={bookingType === 'package_5'}
                        onChange={() => setBookingType('package_5')}
                      />
                      <span>5 Classes Package (${((bookingTeacher.rate_per_45_min || 25) * 5 * 0.95).toFixed(0)})</span>
                    </label>

                    <label 
                      onClick={() => setBookingType('package_10')}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                        bookingType === 'package_10' ? 'bg-accent/10 border-accent font-bold text-accent' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="portal_book_type"
                        checked={bookingType === 'package_10'}
                        onChange={() => setBookingType('package_10')}
                      />
                      <span>10 Classes Package (${((bookingTeacher.rate_per_45_min || 25) * 10 * 0.90).toFixed(0)})</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Time Slot</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-xl"
                    >
                      <option value="10:00 (10:00 AM)">10:00 AM</option>
                      <option value="14:00 (2:00 PM)">02:00 PM</option>
                      <option value="18:00 (6:00 PM)">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Focus Topic</label>
                  <input
                    type="text"
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="Speaking confidence, conversation, grammar"
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Special Notes (Optional)</label>
                  <textarea
                    rows="2"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Any specific goal or question for your teacher..."
                    className="w-full px-3 py-2 text-xs border rounded-xl resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold rounded-xl cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking on Google Meet'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuizModule && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-navy">
                Module {activeQuizModule.number}: {activeQuizModule.quiz.title}
              </h3>
              <button onClick={() => setActiveQuizModule(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {activeQuizModule.quiz.questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 rounded-xl border bg-gray-50 space-y-2">
                    <h5 className="text-xs font-bold text-navy">Q{idx + 1}. {q.question}</h5>
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-2 rounded-lg border text-xs flex items-center gap-2 cursor-pointer ${
                            selected === optIdx ? 'bg-accent/10 border-accent font-bold text-accent' : 'bg-white border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={selected === optIdx}
                            onChange={() => handleSelectOption(q.id, optIdx)}
                            disabled={quizSubmitted}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between items-center">
              {quizScore !== null && (
                <span className="text-xs font-bold text-emerald-600 font-mono">
                  Score: {quizScore}% {quizScore >= 66 ? '✓ Passed' : '✗ Try Again'}
                </span>
              )}

              {!quizSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold rounded-xl cursor-pointer"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveQuizModule(null)}
                  className="px-5 py-2 bg-navy text-white text-xs font-heading font-bold rounded-xl cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

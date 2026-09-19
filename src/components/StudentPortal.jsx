import React, { useState, useEffect } from 'react';
import { X, Play, CheckCircle2, Lock, Sparkles, BookOpen, Clock, Award, Shield, User, Video, Calendar, Gift, HelpCircle, Check, RefreshCw, Star } from 'lucide-react';
import { TRAINING_MODULES } from '../data/modulesData';
import { fetchLiveTutors, createLessonBooking } from '../lib/supabase';

export default function StudentPortal({ isOpen, onClose, studentUser }) {
  const [activeTab, setActiveTab] = useState('tutors'); // 'tutors' | 'curriculum'
  const [activeVideo, setActiveVideo] = useState(null);
  const [completedModules, setCompletedModules] = useState([1]);
  const [quizScores, setQuizScores] = useState({});
  const [liveTutors, setLiveTutors] = useState([]);
  
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
  const [lessonTopic, setLessonTopic] = useState('1-on-1 Spoken Fluency');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadTutors() {
      try {
        const tutors = await fetchLiveTutors();
        if (tutors && tutors.length > 0) {
          setLiveTutors(tutors);
        }
      } catch (e) {
        console.warn('Could not load live tutors:', e);
      }
    }
    if (isOpen) {
      loadTutors();
    }
  }, [isOpen]);

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
    const res = await createLessonBooking({
      teacher_id: bookingTeacher.id,
      teacher_name: bookingTeacher.full_name,
      student_name: studentUser?.full_name || 'Student',
      student_email: studentUser?.email || 'student@domain.com',
      hourly_rate: bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25,
      booking_type: bookingType,
      lesson_topic: lessonTopic,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
    });
    setIsSubmitting(false);

    if (res.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingTeacher(null);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg font-bold text-xl shrink-0">
                {studentUser?.full_name ? studentUser.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-heading font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Student Portal Active
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  Welcome back, {studentUser?.full_name || 'Student'}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  Book 1-on-1 English classes on Google Meet or study the 10-module self-paced spoken fluency course.
                </p>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shrink-0 text-center sm:text-right">
              <span className="text-xs text-gray-300 block font-heading">Course Progress</span>
              <span className="font-heading font-bold text-lg text-accent">
                {completedModules.length} of 10 Modules ({Math.round((completedModules.length / 10) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-gray-200 bg-surface px-6 shrink-0">
          <button
            onClick={() => setActiveTab('tutors')}
            className={`py-3.5 px-5 font-heading font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'tutors'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>1. Browse & Book Live Tutors ({liveTutors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3.5 px-5 font-heading font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-accent text-accent bg-white'
                : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. 10-Module Spoken Fluency Course</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-surface">
          
          {/* TAB 1: LIVE TUTORS */}
          {activeTab === 'tutors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Verified English Teachers Available for Google Meet Classes
                  </h3>
                  <p className="text-xs text-gray-500">
                    Book a free 20-min speaking consultation or standard 45-min lessons.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {liveTutors.map((t) => {
                  const rate = t.rate_per_45_min || t.hourly_rate || 25;
                  const hasTrial = t.offers_free_trial !== false;

                  return (
                    <div key={t.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {hasTrial ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Gift className="w-3 h-3 text-emerald-600" /> Free Trial
                            </span>
                          ) : <span className="text-[10px] text-gray-400 font-mono">45-Min Class</span>}

                          <span className="text-[10px] bg-navy/90 text-white font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Video className="w-3 h-3 text-emerald-400" /> Meet
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={t.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'}
                            alt={t.full_name}
                            className="w-12 h-12 rounded-xl object-cover border"
                          />
                          <div>
                            <h4 className="font-heading font-bold text-sm text-navy">{t.full_name}</h4>
                            <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-current" /> {t.rating || 5.0} ({t.total_students || 15}+ students)
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-500 line-clamp-2">
                          {t.qualifications || 'Certified Communicative Spoken English Coach'}
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
                          className="px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold shadow-xs cursor-pointer"
                        >
                          {hasTrial ? 'Book Trial' : 'Book Class'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: 10-MODULE CURRICULUM */}
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
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
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
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-navy">
                Book Google Meet Class with {bookingTeacher.full_name}
              </h3>
              <button onClick={() => setBookingTeacher(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-base">Class Scheduled!</h4>
              </div>
            ) : (
              <form onSubmit={handleBookTutor} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 block">Class Type</label>
                  <select
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  >
                    {bookingTeacher.offers_free_trial !== false && (
                      <option value="free_trial">Free 20-Min Trial ($0.00)</option>
                    )}
                    <option value="single_45">1 Class 45-Min (${bookingTeacher.rate_per_45_min || bookingTeacher.hourly_rate || 25})</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block">Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block">Time</label>
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
                  <label className="text-xs font-semibold text-gray-700 block">Focus Topic</label>
                  <input
                    type="text"
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="Speaking confidence"
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                  />
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
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-base text-navy">
                Module {activeQuizModule.number}: {activeQuizModule.quiz.title}
              </h3>
              <button onClick={() => setActiveQuizModule(null)} className="text-gray-400 hover:text-gray-600">
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
                  className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-heading font-bold rounded-xl"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveQuizModule(null)}
                  className="px-5 py-2 bg-navy text-white text-xs font-heading font-bold rounded-xl"
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

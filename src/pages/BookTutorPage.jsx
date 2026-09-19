import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Video, Calendar, Clock, Star, Shield, Gift, 
  CheckCircle2, Sparkles, Check, User, Mail, Phone, ExternalLink 
} from 'lucide-react';
import { fetchLiveTutors, createLessonBooking } from '../lib/supabase';

export default function BookTutorPage({ loggedInUser, onOpenAuth }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState('free_trial');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00 (2:00 PM)');
  const [studentName, setStudentName] = useState(loggedInUser?.full_name || 'Henry');
  const [studentEmail, setStudentEmail] = useState(loggedInUser?.email || 'henry@gmail.com');
  const [studentPhone, setStudentPhone] = useState(loggedInUser?.phone || '+1 555 0192');
  const [lessonTopic, setLessonTopic] = useState('1-on-1 Spoken Fluency & Conversation');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadTutor() {
      try {
        setLoading(true);
        const tutors = await fetchLiveTutors();
        const found = tutors.find(t => String(t.id) === String(id)) || tutors[0];
        setTutor(found);
        if (found && found.offers_free_trial === false) {
          setBookingType('single_45');
        }
      } catch (err) {
        console.warn('Error loading tutor:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTutor();
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.full_name) setStudentName(loggedInUser.full_name);
      if (loggedInUser.email) setStudentEmail(loggedInUser.email);
      if (loggedInUser.phone) setStudentPhone(loggedInUser.phone);
    }
  }, [loggedInUser]);

  const rate = tutor?.rate_per_45_min || tutor?.hourly_rate || 25;
  const pkg5Price = (rate * 5 * 0.95).toFixed(2);
  const pkg10Price = (rate * 10 * 0.90).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tutor) return;

    setIsSubmitting(true);

    const res = await createLessonBooking({
      teacher_id: tutor.id,
      teacher_name: tutor.full_name,
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone,
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
      setTimeout(() => {
        navigate('/student-dashboard?tab=bookings');
      }, 2200);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-navy border-t-accent rounded-full animate-spin mx-auto"></div>
          <p className="font-heading font-semibold text-sm text-gray-600">Loading Instructor Profile...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold font-heading text-navy">Instructor Not Found</h2>
          <p className="text-xs text-gray-500">The tutor profile you requested is not currently active.</p>
          <Link
            to="/student-dashboard?tab=tutors"
            className="inline-block px-5 py-2.5 bg-navy text-white text-xs font-heading font-bold rounded-xl"
          >
            Browse Available Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/student-dashboard?tab=tutors"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-gray-600 hover:text-navy transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Instructors Directory</span>
          </Link>
          <span className="text-xs font-heading font-bold text-accent bg-accent/10 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" /> Google Meet Certified
          </span>
        </div>

        {bookingSuccess ? (
          <div className="bg-white rounded-3xl p-10 border border-emerald-200 shadow-xl text-center space-y-4 animate-fadeIn max-w-xl mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-navy">
              Class Booking Successfully Confirmed!
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your 1-on-1 lesson with <strong>{tutor.full_name}</strong> on <strong>Google Meet</strong> has been scheduled.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 text-xs font-mono text-gray-700">
              Redirecting you to your Booked Classes & Google Meet links tab...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Tutor Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
                <div className="relative">
                  <img
                    src={tutor.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80'}
                    alt={tutor.full_name}
                    className="w-full aspect-square rounded-2xl object-cover border-2 border-gray-100 shadow-sm"
                  />
                  {tutor.offers_free_trial !== false && (
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white font-heading font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" /> Free Trial Available
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{tutor.rating || 5.0}</span>
                    <span className="text-gray-400 font-normal">({tutor.total_students || 15}+ active students)</span>
                  </div>
                  <h1 className="text-2xl font-bold font-heading text-navy">
                    {tutor.full_name}
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    {tutor.qualifications || 'Certified Communicative Spoken English Coach & TESOL Specialist'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Standard Rate:</span>
                    <strong className="text-navy font-heading font-bold text-sm">${rate.toFixed(2)} / 45-min</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Class Platform:</span>
                    <strong className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" /> Google Meet
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Trial Class:</span>
                    <strong className="text-emerald-600 font-semibold">Free 20 Mins ($0)</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-heading font-bold text-navy uppercase tracking-wider mb-2">
                    About the Instructor:
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {tutor.bio || 'Specializes in accent reduction, conversational fluency, natural vocabulary building, and professional business English simulations.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs uppercase font-heading font-bold text-accent tracking-wider">
                    Step 1 of 2
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-navy mt-1">
                    Select Your Class Type & Schedule
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose a free trial or multi-class package, select your preferred date, and we'll send the Google Meet invitation instantly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Class Packages */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase font-heading">
                      Select Package / Lesson Option:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tutor.offers_free_trial !== false && (
                        <div
                          onClick={() => setBookingType('free_trial')}
                          className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                            bookingType === 'free_trial'
                              ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950 ring-2 ring-emerald-400/20 shadow-xs'
                              : 'bg-slate-50 hover:bg-gray-100 border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="book_page_type"
                            checked={bookingType === 'free_trial'}
                            onChange={() => setBookingType('free_trial')}
                            className="mt-0.5"
                          />
                          <div className="space-y-0.5">
                            <span className="block font-bold text-emerald-950">Free 20-Min Trial ($0.00)</span>
                            <span className="text-[11px] text-gray-500 font-normal block">
                              1-on-1 fluency assessment & lesson plan introduction on Google Meet.
                            </span>
                          </div>
                        </div>
                      )}

                      <div
                        onClick={() => setBookingType('single_45')}
                        className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          bookingType === 'single_45'
                            ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20 shadow-xs'
                            : 'bg-slate-50 hover:bg-gray-100 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="book_page_type"
                          checked={bookingType === 'single_45'}
                          onChange={() => setBookingType('single_45')}
                          className="mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="block font-bold text-navy">1 Standard Class (45 Mins)</span>
                          <span className="text-[11px] text-gray-500 font-normal block">
                            ${rate.toFixed(2)} single lesson on Google Meet.
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setBookingType('package_5')}
                        className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          bookingType === 'package_5'
                            ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20 shadow-xs'
                            : 'bg-slate-50 hover:bg-gray-100 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="book_page_type"
                          checked={bookingType === 'package_5'}
                          onChange={() => setBookingType('package_5')}
                          className="mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="block font-bold text-navy">5 Classes Package</span>
                          <span className="text-[11px] text-gray-500 font-normal block">
                            ${pkg5Price} total (5 x 45-min, 5% bundle discount).
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setBookingType('package_10')}
                        className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          bookingType === 'package_10'
                            ? 'bg-accent/10 border-accent font-bold text-accent ring-2 ring-accent/20 shadow-xs'
                            : 'bg-slate-50 hover:bg-gray-100 border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="book_page_type"
                          checked={bookingType === 'package_10'}
                          onChange={() => setBookingType('package_10')}
                          className="mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="block font-bold text-navy">10 Classes Package</span>
                          <span className="text-[11px] text-gray-500 font-normal block">
                            ${pkg10Price} total (10 x 45-min, 10% bundle discount).
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase font-heading mb-1.5">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase font-heading mb-1.5">
                        Preferred Time (GMT+1):
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none bg-white"
                      >
                        <option value="09:00 (9:00 AM)">09:00 AM</option>
                        <option value="11:00 (11:00 AM)">11:00 AM</option>
                        <option value="14:00 (2:00 PM)">02:00 PM</option>
                        <option value="16:00 (4:00 PM)">04:00 PM</option>
                        <option value="18:00 (6:00 PM)">06:00 PM</option>
                        <option value="20:00 (8:00 PM)">08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Contact Details */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase font-heading">
                      Student Info:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone / WhatsApp"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Goal and Special Instructions */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase font-heading mb-1.5">
                        Lesson Focus / Learning Target:
                      </label>
                      <input
                        type="text"
                        value={lessonTopic}
                        onChange={(e) => setLessonTopic(e.target.value)}
                        placeholder="e.g. Spoken Fluency, IELTS Speaking, Business English"
                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase font-heading mb-1.5">
                        Special Requests or Notes for Tutor (Optional):
                      </label>
                      <textarea
                        rows="3"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder="Share any specific topics or challenges you want to focus on during your Google Meet session..."
                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to="/student-dashboard?tab=tutors"
                      className="text-xs font-heading font-semibold text-gray-500 hover:text-navy"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>{isSubmitting ? 'Scheduling Lesson...' : 'Confirm Class on Google Meet'}</span>
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

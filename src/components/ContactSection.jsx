import React, { useState } from 'react';
import { submitContactInquiry } from '../lib/supabase';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Student Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await submitContactInquiry(formData);

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'Student Inquiry', message: '' });
  };

  return (
    <section className="section-padding bg-surface relative" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-title">
            <span>Contact Us</span>
            <h2>We'd Love to Hear From You</h2>
          </div>
          <p className="text-body text-base mt-3">
            Have questions about our English courses, tutor bookings, or student platform? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 bg-navy text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="font-heading font-bold text-2xl text-white">Contact Information</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Reach out to our global student support advisors. We respond to all student messages within 24 hours.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-white text-sm">Headquarters & Academy</h5>
                  <p className="text-xs text-gray-300 mt-1">100 Global Education Way, Suite 400<br />Online Learning Network</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-white text-sm">Email Support</h5>
                  <p className="text-xs text-gray-300 mt-1">support@learnenglish.com<br />admissions@learnenglish.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-white text-sm">Phone Line</h5>
                  <p className="text-xs text-gray-300 mt-1">+1 (800) 555-ENGLISH<br />Mon - Fri (8:00 AM - 8:00 PM EST)</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <span className="text-xs text-gray-400 block mb-2">Supabase Sync Status:</span>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Connected to English Tutor Supabase Backend</span>
              </div>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-gray-100">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-navy">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you for contacting Learn English. One of our learning advisors will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-one text-sm px-6 py-2.5 mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-heading font-bold text-2xl text-navy mb-4">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-2">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                  >
                    <option value="Student Inquiry">Student Course Inquiry</option>
                    <option value="Tutor Booking">Live Tutor Booking Question</option>
                    <option value="Technical Support">Platform Technical Support</option>
                    <option value="General">Other Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you would like to learn or ask..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-one w-full py-4 text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

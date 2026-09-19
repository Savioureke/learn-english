import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-navy-light relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand & About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                Learn<span className="text-accent">English</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering learners worldwide to speak English fluently, confidently, and naturally. Connect with live expert native-speaking tutors and master English for your career and life.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-accent hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 border-b border-gray-800 pb-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">About Learn English</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-accent transition-colors">English Courses Catalog</Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-accent transition-colors">Live Native Tutors</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: English Programs */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 border-b border-gray-800 pb-3">
              Learning Programs
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <span className="hover:text-accent cursor-pointer">Conversational English Fluency</span>
              </li>
              <li>
                <span className="hover:text-accent cursor-pointer">Business & Professional English</span>
              </li>
              <li>
                <span className="hover:text-accent cursor-pointer">IELTS & TOEFL Prep Training</span>
              </li>
              <li>
                <span className="hover:text-accent cursor-pointer">Pronunciation & Accent Coaching</span>
              </li>
              <li>
                <span className="hover:text-accent cursor-pointer">Grammar & Vocabulary Mastery</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-6 border-b border-gray-800 pb-3">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Global Online Academy & Learning Hub</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>support@learnenglish.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+1 (800) 555-ENGLISH</span>
              </li>
            </ul>

            <div className="mt-4">
              <label className="block text-xs text-gray-400 mb-2">Subscribe for free tips & lesson updates:</label>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-navy-dark text-white text-xs px-3 py-2.5 rounded-l-lg border border-gray-700 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-r-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Learn English Platform. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Student Help Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

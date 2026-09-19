import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Video, Menu, X, Calendar } from 'lucide-react';

export default function Navbar({ onOpenAuth, loggedInUser, onLogout, onOpenStudentPortal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-5 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy to-navy-light flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-navy tracking-tight group-hover:text-accent transition-colors">
                Learn<span className="text-accent">English</span>
              </span>
              <span className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest font-semibold">
                Global Learning Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-heading font-medium text-base transition-colors hover:text-accent ${isActive('/') ? 'text-accent font-semibold' : 'text-navy'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-heading font-medium text-base transition-colors hover:text-accent ${isActive('/about') ? 'text-accent font-semibold' : 'text-navy'}`}
            >
              About Us
            </Link>
            <Link 
              to="/courses" 
              className={`font-heading font-medium text-base transition-colors hover:text-accent ${isActive('/courses') ? 'text-accent font-semibold' : 'text-navy'}`}
            >
              Courses & Speaking
            </Link>
            <Link 
              to="/mentors" 
              className={`font-heading font-medium text-base transition-colors hover:text-accent ${isActive('/mentors') ? 'text-accent font-semibold' : 'text-navy'}`}
            >
              Live Expert Tutors
            </Link>
            <Link 
              to="/contact" 
              className={`font-heading font-medium text-base transition-colors hover:text-accent ${isActive('/contact') ? 'text-accent font-semibold' : 'text-navy'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Auth & Portal Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {loggedInUser ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/student-dashboard"
                  className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full border border-gray-200 transition-colors"
                  title="Go to Student Dashboard"
                >
                  <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs">
                    {loggedInUser.full_name ? loggedInUser.full_name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <span className="font-heading font-semibold text-sm text-navy max-w-[130px] truncate">
                    {loggedInUser.full_name || 'Student'}
                  </span>
                </Link>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="header-btn hover:text-accent cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="btn-one cursor-pointer"
                >
                  Start Learning Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {loggedInUser && (
              <Link
                to="/student-dashboard"
                className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs shadow-sm"
                title="Student Dashboard"
              >
                {loggedInUser.full_name ? loggedInUser.full_name.charAt(0).toUpperCase() : 'S'}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-gray-100 flex flex-col gap-4 animate-fadeIn">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading font-semibold text-lg text-navy hover:text-accent py-1"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading font-semibold text-lg text-navy hover:text-accent py-1"
            >
              About Us
            </Link>
            <Link 
              to="/courses" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading font-semibold text-lg text-navy hover:text-accent py-1"
            >
              Courses & Speaking
            </Link>
            <Link 
              to="/mentors" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading font-semibold text-lg text-navy hover:text-accent py-1"
            >
              Live Expert Tutors
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading font-semibold text-lg text-navy hover:text-accent py-1"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              {loggedInUser ? (
                <>
                  <Link
                    to="/student-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-navy text-white font-heading font-semibold py-3 rounded-full shadow-md"
                  >
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>My Student Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-center text-red-500 font-heading font-medium py-2"
                  >
                    Sign Out ({loggedInUser.full_name || 'Student'})
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full py-2.5 border border-navy text-navy font-heading font-semibold rounded-full"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="w-full py-2.5 bg-accent text-white font-heading font-semibold rounded-full shadow-md"
                  >
                    Start Learning Now
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

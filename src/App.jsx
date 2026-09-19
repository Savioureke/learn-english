import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import MentorsPage from './pages/MentorsPage';
import ContactPage from './pages/ContactPage';
import AuthModal from './components/AuthModal';
import StudentPortal from './components/StudentPortal';

// Component to handle scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signup');
  const [studentPortalOpen, setStudentPortalOpen] = useState(false);

  // Check saved student session on launch
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem('learn_english_student');
      if (savedStudent) {
        setLoggedInUser(JSON.parse(savedStudent));
      }
    } catch (e) {
      console.warn('Error reading saved session:', e);
    }
  }, []);

  const handleOpenAuth = (tab = 'signup') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setLoggedInUser(user);
    setAuthModalOpen(false);
    // Auto-open student portal upon login/signup
    setStudentPortalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('learn_english_student');
    setLoggedInUser(null);
    setStudentPortalOpen(false);
  };

  const handleOpenStudentPortal = () => {
    if (!loggedInUser) {
      handleOpenAuth('login');
    } else {
      setStudentPortalOpen(true);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white font-sans text-body">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenAuth={handleOpenAuth} 
          loggedInUser={loggedInUser} 
          onLogout={handleLogout}
          onOpenStudentPortal={handleOpenStudentPortal}
        />

        {/* Main Routes */}
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenAuth={handleOpenAuth} 
                  onOpenStudentPortal={handleOpenStudentPortal}
                  loggedInUser={loggedInUser}
                />
              } 
            />
            <Route 
              path="/about" 
              element={<AboutPage onOpenAuth={handleOpenAuth} />} 
            />
            <Route 
              path="/courses" 
              element={<CoursesPage onOpenAuth={handleOpenAuth} />} 
            />
            <Route 
              path="/mentors" 
              element={<MentorsPage onOpenAuth={handleOpenAuth} />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer onOpenAuth={handleOpenAuth} />

        {/* Auth Modal (Sign Up / Sign In) */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialTab={authTab}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Protected Student Video Portal */}
        <StudentPortal
          isOpen={studentPortalOpen}
          onClose={() => setStudentPortalOpen(false)}
          studentUser={loggedInUser}
        />

      </div>
    </Router>
  );
}

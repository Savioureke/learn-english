import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import MentorsPage from './pages/MentorsPage';
import ContactPage from './pages/ContactPage';
import StudentDashboard from './pages/StudentDashboard';
import ModuleDetailsPage from './pages/ModuleDetailsPage';
import BookTutorPage from './pages/BookTutorPage';
import AuthModal from './components/AuthModal';

// Component to handle scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainAppContent() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signup');

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
    // Direct navigation to dedicated Student Dashboard page
    navigate('/student-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('learn_english_student');
    setLoggedInUser(null);
    navigate('/');
  };

  const handleOpenStudentPortal = () => {
    if (!loggedInUser) {
      handleOpenAuth('login');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-body">
      <ScrollToTop />
      
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
          {/* Dedicated Full Page Routes */}
          <Route 
            path="/student-dashboard" 
            element={
              <StudentDashboard 
                loggedInUser={loggedInUser} 
                onOpenAuth={handleOpenAuth} 
              />
            } 
          />
          <Route 
            path="/student/module/:id" 
            element={<ModuleDetailsPage />} 
          />
          <Route 
            path="/book-tutor/:id" 
            element={
              <BookTutorPage 
                loggedInUser={loggedInUser} 
                onOpenAuth={handleOpenAuth} 
              />
            } 
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
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainAppContent />
    </Router>
  );
}

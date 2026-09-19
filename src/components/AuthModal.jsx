import React, { useState } from 'react';
import { registerStudent, loginStudent } from '../lib/supabase';
import { X, BookOpen, Mail, Lock, User, Phone, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialTab = 'signup', onAuthSuccess }) {
  const [tab, setTab] = useState(initialTab); // 'signup' or 'login'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (tab === 'signup') {
      if (!form.fullName || !form.email || !form.password) {
        setErrorMsg('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      const res = await registerStudent({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone
      });

      setLoading(false);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to register student account.');
      }
    } else {
      if (!form.email || !form.password) {
        setErrorMsg('Please enter your email and password.');
        setLoading(false);
        return;
      }

      const res = await loginStudent({
        email: form.email,
        password: form.password
      });

      setLoading(false);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-navy transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="bg-gradient-to-r from-navy to-navy-light text-white p-8 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white">
            {tab === 'signup' ? 'Student Registration' : 'Student Sign In'}
          </h3>
          <p className="text-xs text-gray-300 mt-1">
            {tab === 'signup' 
              ? 'Create your free account to unlock English video tutorials & expert tutors' 
              : 'Access your Student Video Tutorials & personalized learning schedule'}
          </p>

          {/* Tabs */}
          <div className="flex bg-navy-dark/60 p-1 rounded-full mt-6 max-w-xs mx-auto border border-white/10">
            <button
              onClick={() => { setTab('signup'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                tab === 'signup' ? 'bg-accent text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign Up (New Student)
            </button>
            <button
              onClick={() => { setTab('login'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                tab === 'login' ? 'bg-accent text-white shadow-sm' : 'text-gray-300 hover:text-white'
              }`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleAuth} className="p-8 space-y-4">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-heading font-semibold text-navy uppercase tracking-wider mb-1.5">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="+1 555-0199"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-accent text-sm text-navy bg-surface"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-one w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Processing...' : (tab === 'signup' ? 'Complete Registration & Unlock Portal' : 'Sign In to Portal')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              {tab === 'signup' ? (
                <>Already registered? <button type="button" onClick={() => setTab('login')} className="text-accent font-semibold underline">Log in here</button></>
              ) : (
                <>Need a student account? <button type="button" onClick={() => setTab('signup')} className="text-accent font-semibold underline">Sign up free</button></>
              )}
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}

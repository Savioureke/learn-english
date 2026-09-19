import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ttmqfqqfpogjoaalnfcd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXFmcXFmcG9nam9hYWxuZmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjY2MzAsImV4cCI6MjEwNTA0MjYzMH0.RWcpQ5ioQvyjwsE2NCYnfizpcIa0nyUgDcoB2CPyQU8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function saveSession(user) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem('learn_english_student', JSON.stringify(user));
    } catch (e) {
      console.warn('Session save warning:', e);
    }
  }
}

/**
 * Register a student into Supabase `students` table and `users` table.
 */
export async function registerStudent({ fullName, email, password, phone }) {
  try {
    const studentId = 'stu-' + Date.now();
    const cleanEmail = email.toLowerCase().trim();

    // 1. Insert/Upsert into main users table (role = 'learner')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: studentId,
          full_name: fullName,
          email: cleanEmail,
          password_hash: password,
          phone: phone || null,
          role: 'learner',
          funded_balance: 0,
          terms_accepted: true,
          is_live_on_homepage: false
        }
      ], { onConflict: 'email' })
      .select()
      .single();

    if (userError) {
      console.warn('Users table upsert note:', userError);
    }

    // 2. Try inserting into students table as well
    let studentData = null;
    try {
      const { data, error: studentError } = await supabase
        .from('students')
        .insert([
          {
            id: studentId,
            full_name: fullName,
            email: cleanEmail,
            password_hash: password,
            phone: phone || null,
            status: 'active'
          }
        ])
        .select()
        .single();
      
      if (!studentError) {
        studentData = data;
      }
    } catch (e) {
      console.warn('Students table optional insert note:', e);
    }

    const baseUser = studentData || userData || {
      id: studentId,
      full_name: fullName,
      email: cleanEmail
    };

    const activeUser = {
      ...baseUser,
      role: 'learner'
    };

    saveSession(activeUser);
    return { success: true, user: activeUser };
  } catch (error) {
    console.error('Registration exception:', error);
    return { success: false, error: error.message || 'Registration failed.' };
  }
}

/**
 * Student Login verification against Supabase backend.
 */
export async function loginStudent({ email, password }) {
  try {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Check users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .single();

    if (user && user.password_hash === password) {
      const activeUser = { ...user, role: user.role || 'learner' };
      saveSession(activeUser);
      return { success: true, user: activeUser };
    }

    // 2. Check students table fallback
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('email', cleanEmail)
      .single();

    if (student && student.password_hash === password) {
      const formattedStudent = {
        ...student,
        role: 'learner'
      };
      saveSession(formattedStudent);
      return { success: true, user: formattedStudent };
    }

    return { success: false, error: 'Invalid email address or password.' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'Login failed.' };
  }
}

/**
 * Fetch Live Tutors / Teachers registered on English Tutor platform.
 */
export async function fetchLiveTutors() {
  try {
    const { data: teachers, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'teacher')
      .order('rating', { ascending: false });

    if (error) {
      console.warn('Error fetching teachers from Supabase:', error);
      return [];
    }

    return teachers || [];
  } catch (error) {
    console.error('Fetch live tutors failed:', error);
    return [];
  }
}

/**
 * Submit Contact / Inquiry message to Supabase.
 */
export async function submitContactInquiry({ name, email, subject, message }) {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          id: 'inq-' + Date.now(),
          name: name,
          full_name: name,
          email: email,
          subject: subject || 'General Inquiry',
          message: message,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) console.warn('Contact inquiry save warning:', error);
    return { success: true };
  } catch (error) {
    console.error('Contact inquiry exception:', error);
    return { success: true };
  }
}

# Learn English - React + Tailwind CSS Web Application

A modern, full-stack **React + Tailwind CSS** platform for learning English online, connected to a shared **Supabase backend**.

## 🌟 Key Features

- **React 18 & Vite**: Built with fast component-driven architecture and Vite bundler.
- **Tailwind CSS Styling**: Preserves exact original typography (`DM Sans` & `Jost`), color palette (`navy: #0b104a`, `accent: #ff553e`), card layouts, and responsive design.
- **Shared Supabase Backend**: Integrated directly with `english_teacher` Supabase backend.
  - **Student Enrollment**: Sign-up saves learner records into `students` table and syncs to `users` table (`role = 'learner'`).
  - **Live Expert Tutors**: Dynamically fetches native-speaking tutors registered on the English Tutor website (`role = 'teacher'`).
  - **Contact Inquiries**: Dispatches student inquiries directly to `contact_inquiries` table.
- **Student Video Portal**: Unlocked upon student Sign In, featuring 4 embedded English tutoring video lessons on speaking fluency, conversation practice, pronunciation, and grammar.
- **Vercel Deployment Ready**: Includes `vercel.json` SPA route rewrites.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment to Vercel

1. Import this repository (`Savioureke/learn-english`) into Vercel.
2. Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

import React, { useState } from 'react';
import { X, Play, CheckCircle2, Lock, Sparkles, BookOpen, Clock, Award, Shield, User } from 'lucide-react';

const ENGLISH_VIDEOS = [
  {
    id: 1,
    title: 'How to Speak English Fluently & Confidently (Mastery Secrets)',
    youtubeId: 'l4Z88YfD1O0',
    embedUrl: 'https://www.youtube.com/embed/l4Z88YfD1O0',
    duration: '18 mins',
    level: 'All Levels',
    category: 'Speaking Fluency',
    instructor: 'Rachel’s English / Expert Tutor',
    description: 'Learn step-by-step techniques to overcome speech hesitation, build smooth sentence flow, and speak English with confidence in any conversation.',
    keyTakeaways: [
      'Overcoming language anxiety & nervousness',
      'The shadowing technique for natural flow',
      'Linking words like a native speaker'
    ]
  },
  {
    id: 2,
    title: 'Master Everyday English Conversation & Essential Phrases',
    youtubeId: '6S-GzC_P5B0',
    embedUrl: 'https://www.youtube.com/embed/6S-GzC_P5B0',
    duration: '22 mins',
    level: 'Intermediate',
    category: 'Conversational Practice',
    instructor: 'English With Lucy / Certified Instructor',
    description: 'Practical dialogue practice covering real-life scenarios, social interactions, workplace chats, and natural native expressions.',
    keyTakeaways: [
      'Top 50 native conversational idioms',
      'How to answer questions naturally without long pauses',
      'Small talk mastery for career & travel'
    ]
  },
  {
    id: 3,
    title: 'English Pronunciation & Accent Clarity Masterclass',
    youtubeId: 'v4Q_6F0s23M',
    embedUrl: 'https://www.youtube.com/embed/v4Q_6F0s23M',
    duration: '25 mins',
    level: 'Beginner to Advanced',
    category: 'Pronunciation & Accent',
    instructor: 'BBC Learning English Team',
    description: 'Targeted vowel and consonant articulation practice. Clear up common pronunciation mistakes and achieve clear, understandable speech.',
    keyTakeaways: [
      'Mastering tricky English vowel sounds',
      'Intonation patterns and word stress rules',
      'Mouth and tongue placement exercises'
    ]
  },
  {
    id: 4,
    title: 'Grammar Secrets for Fast Fluency (Speak Without Thinking)',
    youtubeId: 'ju8xK19xW7Y',
    embedUrl: 'https://www.youtube.com/embed/ju8xK19xW7Y',
    duration: '20 mins',
    level: 'Foundational',
    category: 'Grammar & Sentence Building',
    instructor: 'Learn English With Papa Teach Me',
    description: 'Discover how to apply essential English grammar structures instantly in conversation without overanalyzing rules while speaking.',
    keyTakeaways: [
      'Automating verb tenses in spontaneous speech',
      'Preposition rules made super simple',
      'Error-free sentence construction strategies'
    ]
  }
];

export default function StudentPortal({ isOpen, onClose, studentUser }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);

  if (!isOpen) return null;

  const toggleComplete = (videoId) => {
    if (completedVideos.includes(videoId)) {
      setCompletedVideos(completedVideos.filter(id => id !== videoId));
    } else {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-gray-100">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg font-bold text-xl">
                {studentUser?.full_name ? studentUser.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-heading font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Student Portal Unlocked
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  Welcome back, {studentUser?.full_name || 'Student'}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  Your English Fluency Video Tutorials are ready. Complete all 4 videos to earn your practice badge!
                </p>
              </div>
            </div>

            {/* Progress Badge */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shrink-0 text-center sm:text-right">
              <span className="text-xs text-gray-300 block font-heading">Overall Completion</span>
              <span className="font-heading font-bold text-lg text-accent">
                {completedVideos.length} of 4 Lessons ({Math.round((completedVideos.length / 4) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Video Player Modal Overlay */}
        {activeVideo && (
          <div className="p-6 bg-slate-900 text-white border-b border-gray-800 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs text-accent font-heading font-bold uppercase tracking-wider">
                  Now Watching: {activeVideo.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-0.5">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-heading font-semibold text-white transition-colors"
              >
                Close Player
              </button>
            </div>

            {/* Embedded YouTube Video Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-800">
              <iframe
                src={`${activeVideo.embedUrl}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-4">
                <span>Instructor: <strong>{activeVideo.instructor}</strong></span>
                <span>Duration: <strong>{activeVideo.duration}</strong></span>
              </div>
              <button
                onClick={() => toggleComplete(activeVideo.id)}
                className={`px-4 py-2 rounded-full font-heading font-bold text-xs transition-colors flex items-center gap-1.5 ${
                  completedVideos.includes(activeVideo.id)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-accent text-white hover:bg-accent-hover'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedVideos.includes(activeVideo.id) ? 'Completed!' : 'Mark as Completed'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Video Tutorial Grid */}
        <div className="p-6 sm:p-8 bg-surface space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>English Speaking & Fluency Video Courses</span>
            </h3>
            <span className="text-xs text-gray-500">4 Exclusive English Tutoring Videos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGLISH_VIDEOS.map((video) => {
              const isDone = completedVideos.includes(video.id);

              return (
                <div
                  key={video.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border flex flex-col justify-between ${
                    isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-200'
                  }`}
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="bg-accent-light text-accent font-heading font-bold px-2.5 py-0.5 rounded-md">
                        {video.category}
                      </span>
                      <div className="flex items-center gap-1 text-navy font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>{video.duration}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-bold text-lg text-navy leading-snug mb-2">
                      {video.title}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {video.description}
                    </p>

                    {/* Key Takeaways */}
                    <div className="bg-surface p-3 rounded-xl border border-gray-100 mb-4 space-y-1.5">
                      <span className="text-[11px] font-heading font-bold text-navy block uppercase tracking-wider">
                        Key Lesson Takeaways:
                      </span>
                      {video.keyTakeaways.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-navy font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="btn-one py-2.5 px-5 text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Watch Lesson Now</span>
                    </button>

                    <button
                      onClick={() => toggleComplete(video.id)}
                      className={`text-xs font-heading font-semibold px-3 py-2 rounded-lg border transition-colors ${
                        isDone
                          ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                          : 'border-gray-200 text-gray-500 hover:border-navy hover:text-navy'
                      }`}
                    >
                      {isDone ? '✓ Completed' : 'Mark Done'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Footer Notice */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3">
            <h4 className="font-heading font-bold text-navy text-base">Ready for 1-on-1 Practice with Live Native Tutors?</h4>
            <p className="text-xs text-gray-600 max-w-xl mx-auto">
              Combine your video lessons with live speaking practice! Browse our verified tutors registered across the English Tutor network and book your live session today.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-navy hover:bg-accent text-white font-heading font-semibold text-xs rounded-full transition-colors cursor-pointer"
            >
              Browse Live Tutors Directory
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Play, HelpCircle, CheckCircle2, Clock, 
  Sparkles, Check, RefreshCw, ChevronRight, BookOpen, Shield 
} from 'lucide-react';
import { TRAINING_MODULES } from '../data/modulesData';

export default function ModuleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleNumber = parseInt(id, 10) || 1;

  const currentModule = TRAINING_MODULES.find(m => m.number === moduleNumber) || TRAINING_MODULES[0];

  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'quiz'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('video');
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizPassed(false);
  }, [moduleNumber]);

  const handleSelectOption = (qId, idx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleSubmitQuiz = () => {
    const questions = currentModule.quiz.questions;
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    const passed = calculatedScore >= (currentModule.quiz.passingScore || 66);
    setQuizScore(calculatedScore);
    setQuizPassed(passed);
    setQuizSubmitted(true);
  };

  const nextModule = TRAINING_MODULES.find(m => m.number === moduleNumber + 1);
  const prevModule = TRAINING_MODULES.find(m => m.number === moduleNumber - 1);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/student-dashboard?tab=courses"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-gray-600 hover:text-navy transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevModule && (
              <Link
                to={`/student/module/${prevModule.number}`}
                className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-heading font-semibold rounded-lg text-gray-700 hover:text-navy"
              >
                ← Prev Module
              </Link>
            )}
            {nextModule && (
              <Link
                to={`/student/module/${nextModule.number}`}
                className="px-3 py-1.5 bg-navy text-white text-xs font-heading font-semibold rounded-lg hover:bg-navy-light"
              >
                Next Module →
              </Link>
            )}
          </div>
        </div>

        {/* Module Header Card */}
        <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-white font-mono font-bold text-xs px-3 py-1 rounded-full uppercase">
                Module {currentModule.number} of 10
              </span>
              <span className="bg-white/10 text-gray-200 text-xs font-heading px-3 py-1 rounded-full">
                {currentModule.category}
              </span>
              <span className="bg-white/10 text-gray-200 text-xs font-heading px-3 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" /> {currentModule.duration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              {currentModule.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              {currentModule.description}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center border-b border-gray-200 bg-white rounded-2xl p-1.5 shadow-xs max-w-md">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'video'
                ? 'bg-navy text-white shadow-sm'
                : 'text-gray-600 hover:text-navy'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>1. Video Lesson</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-accent text-white shadow-sm'
                : 'text-gray-600 hover:text-navy'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>2. Knowledge Quiz</span>
          </button>
        </div>

        {/* Main Content Area */}
        {activeTab === 'video' ? (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-gray-200">
              <iframe
                src={`${currentModule.embedUrl}?rel=0`}
                title={currentModule.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Key Takeaways Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-navy flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Key Pedagogy Takeaways from this Lesson:</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {currentModule.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Module Quiz (3 Questions) →</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Quiz View */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-navy">
                  {currentModule.quiz.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Answer all 3 questions. Minimum passing score is 66% (2/3 correct).
                </p>
              </div>

              {quizScore !== null && (
                <span className={`px-4 py-1.5 rounded-full font-mono font-bold text-xs ${
                  quizPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  Score: {quizScore}% {quizPassed ? '✓ Passed' : '✗ Try Again'}
                </span>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {currentModule.quiz.questions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      quizSubmitted 
                        ? isCorrect 
                          ? 'bg-emerald-50/50 border-emerald-300' 
                          : 'bg-red-50/50 border-red-300' 
                        : 'bg-slate-50 border-gray-200'
                    }`}
                  >
                    <h4 className="font-heading font-bold text-base text-navy mb-3">
                      <span className="text-accent mr-1 font-mono">Q{idx + 1}.</span> {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isRightAnswer = q.correctIndex === optIdx;

                        return (
                          <label
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer transition-all ${
                              quizSubmitted
                                ? isRightAnswer
                                  ? 'bg-emerald-100 border-emerald-400 font-bold text-emerald-950'
                                  : isChosen
                                    ? 'bg-red-100 border-red-300 font-bold text-red-950'
                                    : 'bg-white border-gray-200 opacity-60'
                                : isChosen
                                  ? 'bg-accent/10 border-accent font-bold text-accent shadow-xs'
                                  : 'bg-white hover:bg-gray-100 border-gray-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={isChosen}
                              onChange={() => handleSelectOption(q.id, optIdx)}
                              disabled={quizSubmitted}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`mt-3 p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('video')}
                className="text-xs font-heading font-semibold text-gray-500 hover:text-navy"
              >
                ← Back to Video
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < currentModule.quiz.questions.length}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs rounded-xl shadow-md disabled:opacity-50 cursor-pointer"
                >
                  Submit & Check Answers
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  {!quizPassed && (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizScore(null);
                        setSelectedAnswers({});
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-heading font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                    </button>
                  )}
                  {nextModule && quizPassed && (
                    <Link
                      to={`/student/module/${nextModule.number}`}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                    >
                      <span>Proceed to Module {nextModule.number} →</span>
                    </Link>
                  )}
                  <Link
                    to="/student-dashboard?tab=courses"
                    className="px-5 py-2.5 bg-navy text-white text-xs font-heading font-semibold rounded-xl"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

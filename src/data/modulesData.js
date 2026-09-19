/**
 * 10-Module Spoken English Pedagogy & Online Tutoring Curriculum
 * Shared across English Tutor and Learn English Platforms.
 */

export const TRAINING_MODULES = [
  {
    id: 1,
    number: 1,
    title: 'Foundations of Communicative English & the PPP Framework',
    category: 'Pedagogy & Lesson Framework',
    duration: '20 mins',
    embedUrl: 'https://www.youtube.com/embed/Jm-3M4iS_5g',
    description: 'Master the Presentation, Practice, and Production (PPP) methodology. Learn how to structure 45-minute communicative English lessons with high Student Talk Time (STT).',
    keyTakeaways: [
      'Presentation: Clear context setting and modeling without lengthy teacher monologues',
      'Practice: Controlled drills, guided dialogues, and concept verification',
      'Production: Free communicative tasks simulating real-world conversation'
    ],
    quiz: {
      title: 'Module 1 Knowledge Check: PPP Framework',
      passingScore: 66,
      questions: [
        {
          id: 'm1_q1',
          question: 'What does the "PPP" methodology stand for in English language teaching?',
          options: [
            'Preparation, Pronunciation, Punctuation',
            'Presentation, Practice, Production',
            'Participation, Phonics, Performance',
            'Planning, Processing, Publishing'
          ],
          correctIndex: 1,
          explanation: 'PPP stands for Presentation (introducing target language), Practice (guided exercises), and Production (free speaking application).'
        },
        {
          id: 'm1_q2',
          question: 'In a 45-minute 1-on-1 spoken English lesson, what is the ideal Student Talk Time (STT) vs. Teacher Talk Time (TTT)?',
          options: [
            '30% Student / 70% Teacher',
            '50% Student / 50% Teacher',
            '70% Student / 30% Teacher',
            '95% Teacher / 5% Student'
          ],
          correctIndex: 2,
          explanation: 'Communicative fluency requires maximizing student speaking opportunities (70%+ STT) while the teacher facilitates, guides, and corrects.'
        },
        {
          id: 'm1_q3',
          question: 'What is the primary objective of the "Production" phase?',
          options: [
            'Having the student read a grammar textbook silently',
            'Enabling the student to use target language freely in authentic communicative contexts',
            'Giving the student a written multiple-choice exam',
            'Explaining linguistic history for 20 minutes'
          ],
          correctIndex: 1,
          explanation: 'The Production phase allows the learner to spontaneously deploy vocabulary and grammar in real-life roleplays or discussions.'
        }
      ]
    }
  },
  {
    id: 2,
    number: 2,
    title: 'Structuring a 45-Minute 1-on-1 Speaking Lesson',
    category: 'Lesson Planning & Timing',
    duration: '22 mins',
    embedUrl: 'https://www.youtube.com/embed/Z5D4e6K48eU',
    description: 'Learn the exact 45-minute lesson blueprint: 5-min warm-up, 10-min skill presentation, 20-min interactive speaking practice, and 10-min error feedback wrap-up.',
    keyTakeaways: [
      'Warm-up & Rapport (0-5 mins): Low-pressure questions to get the student speaking immediately',
      'Core Activity (5-35 mins): Guided roleplay, debate, or structured interview',
      'Feedback & Wrap-up (35-45 mins): Constructive corrections and homework assignment'
    ],
    quiz: {
      title: 'Module 2 Knowledge Check: 45-Min Lesson Structuring',
      passingScore: 66,
      questions: [
        {
          id: 'm2_q1',
          question: 'How long should the initial warm-up / rapport-building phase typically last in a 45-minute lesson?',
          options: [
            '15 to 20 minutes',
            '3 to 5 minutes',
            '30 seconds only',
            '35 minutes'
          ],
          correctIndex: 1,
          explanation: 'A 3-5 minute friendly warm-up eases anxiety, breaks the ice, and primes the student for the core lesson without consuming too much time.'
        },
        {
          id: 'm2_q2',
          question: 'Why are Concept Checking Questions (CCQs) preferred over asking "Do you understand?"',
          options: [
            'Because CCQs verify actual comprehension rather than polite passive agreement',
            'Because CCQs are harder for the tutor to prepare',
            'Because CCQs only test spelling',
            'Because students always say "No" when asked if they understand'
          ],
          correctIndex: 0,
          explanation: 'Students frequently say "Yes" out of politeness. CCQs (e.g., "Is this happening now or in the past?") check genuine understanding.'
        },
        {
          id: 'm2_q3',
          question: 'What should every 45-minute lesson conclude with?',
          options: [
            'Ending the call abruptly at minute 45',
            'Constructive error feedback, vocabulary summary, and positive encouragement',
            'Assigning a 5,000-word written essay',
            'Telling the student only their mistakes without encouragement'
          ],
          correctIndex: 1,
          explanation: 'A strong wrap-up reinforces takeaways, provides actionable corrections, and leaves the student energized for their next booking.'
        }
      ]
    }
  },
  {
    id: 3,
    number: 3,
    title: 'Phonetics, Pronunciation & Accent Clarification',
    category: 'Pronunciation & Phonology',
    duration: '25 mins',
    embedUrl: 'https://www.youtube.com/embed/v4Q_6F0s23M',
    description: 'Help international students speak clearly. Master word stress, sentence intonation, minimal pairs, and vocal shadowing drills.',
    keyTakeaways: [
      'Syllable & Word Stress: Emphasizing the correct beat for immediate native-like clarity',
      'Sentence Rhythm: Content words vs. function words in connected speech',
      'The Shadowing Technique: Repetitive auditory mirroring to reprogram mouth muscle memory'
    ],
    quiz: {
      title: 'Module 3 Knowledge Check: Phonetics & Pronunciation',
      passingScore: 66,
      questions: [
        {
          id: 'm3_q1',
          question: 'What is "Word Stress" in spoken English?',
          options: [
            'Speaking all syllables at the exact same volume and tone',
            'Emphasizing the primary syllable with higher pitch, longer duration, and greater clarity',
            'Speaking faster when you feel nervous',
            'Translating words into your native language'
          ],
          correctIndex: 1,
          explanation: 'English is a stress-timed language. Correct syllable stress (e.g., PHUtograph vs. phoTOGraphy) is vital for listener comprehension.'
        },
        {
          id: 'm3_q2',
          question: 'How does the "Vocal Shadowing" technique improve pronunciation and rhythm?',
          options: [
            'The student reads a dictionary in silence',
            'The student listens to native audio and immediately mirrors the exact pitch, rhythm, and mouth shapes',
            'The student memorizes phonetic symbols without speaking',
            'The student writes down words 50 times'
          ],
          correctIndex: 1,
          explanation: 'Shadowing trains muscle memory in the tongue, lips, and vocal cords to reproduce natural cadence and connected speech.'
        },
        {
          id: 'm3_q3',
          question: 'What is a "Minimal Pair" exercise used for in pronunciation tutoring?',
          options: [
            'Pairing two students who speak the same language',
            'Contrasting two words that differ by only one sound (e.g., ship vs. sheep) to train precise articulation',
            'Teaching two-word phrasal verbs only',
            'Shortening lessons to 2 minutes'
          ],
          correctIndex: 1,
          explanation: 'Minimal pairs isolate difficult vowel and consonant distinctions that non-native speakers commonly confuse.'
        }
      ]
    }
  },
  {
    id: 4,
    number: 4,
    title: 'Conversational Grammar: Teaching Without Boring Drills',
    category: 'Grammar in Context',
    duration: '21 mins',
    embedUrl: 'https://www.youtube.com/embed/ju8xK19xW7Y',
    description: 'Discover how to guide students into using accurate grammar spontaneously without bogging down conversations with heavy technical terminology.',
    keyTakeaways: [
      'Inductive Learning: Providing realistic context before stating the grammar rule',
      'Situational Tenses: Practicing past, present, and future within personalized life stories',
      'Immediate Application: Turning grammar patterns into engaging conversational prompts'
    ],
    quiz: {
      title: 'Module 4 Knowledge Check: Conversational Grammar',
      passingScore: 66,
      questions: [
        {
          id: 'm4_q1',
          question: 'What is "Inductive Grammar Teaching"?',
          options: [
            'Giving students a lecture on 12 verb tenses before letting them speak',
            'Guiding students to notice grammatical patterns through natural examples and conversation',
            'Banning all grammar from the lesson',
            'Translating sentences word-by-word into Latin'
          ],
          correctIndex: 1,
          explanation: 'Inductive teaching lets students infer the rule from authentic conversational usage, leading to deeper retention.'
        },
        {
          id: 'm4_q2',
          question: 'When a student makes a minor grammar error during a passionate, fluent speaking turn, what should you do?',
          options: [
            'Interrupt them immediately in the middle of their sentence to fix it',
            'Take a quiet note and address it during the designated delayed feedback segment',
            'Pretend the mistake never happened and never correct it',
            'End the lesson immediately'
          ],
          correctIndex: 1,
          explanation: 'Delayed correction preserves the student’s conversational flow and confidence while ensuring mistakes are reviewed constructively.'
        },
        {
          id: 'm4_q3',
          question: 'Which exercise best helps adult learners automate grammatical structures?',
          options: [
            'Filling out multiple-choice worksheets during the call',
            'Answering open-ended questions about their own career, travel, or family using target patterns',
            'Memorizing irregular verb tables in alphabetical order',
            'Silent reading'
          ],
          correctIndex: 1,
          explanation: 'Personalized relevance activates episodic memory, cementing grammar structures directly into spontaneous speech.'
        }
      ]
    }
  },
  {
    id: 5,
    number: 5,
    title: 'Vocabulary Acquisition & Idiomatic Fluency',
    category: 'Vocabulary & Idioms',
    duration: '24 mins',
    embedUrl: 'https://www.youtube.com/embed/6S-GzC_P5B0',
    description: 'Equip your students with high-frequency idioms, collocations, and phrasal verbs so they sound natural and professional in business and social settings.',
    keyTakeaways: [
      'Collocations: Teaching natural word partnerships (e.g. "make a decision", not "do a decision")',
      'Active vs. Passive Vocabulary: Transitioning recognized words into spoken production',
      'Retention Systems: Digital flashcards and in-lesson spaced repetition'
    ],
    quiz: {
      title: 'Module 5 Knowledge Check: Vocabulary & Idioms',
      passingScore: 66,
      questions: [
        {
          id: 'm5_q1',
          question: 'What is a "Collocation" in the English language?',
          options: [
            'Two words that rhyme together',
            'Words that naturally and frequently occur together in native speech (e.g., "heavy rain", "take a break")',
            'A word borrowed from French',
            'An accidental typing typo'
          ],
          correctIndex: 1,
          explanation: 'Teaching collocations prevents unnatural word choices and dramatically enhances the student’s native fluency.'
        },
        {
          id: 'm5_q2',
          question: 'How many new target vocabulary items should be introduced in a single 45-minute lesson for optimal retention?',
          options: [
            '50 to 100 new words',
            '5 to 8 high-impact words or phrases with deep practice',
            '1 word only',
            'Zero new words ever'
          ],
          correctIndex: 1,
          explanation: 'Introducing 5 to 8 items allows enough time for pronunciation, contextual drilling, and conversational production without cognitive overload.'
        },
        {
          id: 'm5_q3',
          question: 'What is the most effective method for student vocabulary retention after class?',
          options: [
            'Asking the student to use each new item in 3 personal conversational sentences and logging them in shared notes',
            'Telling the student to stare at a dictionary page',
            'Never reviewing the words again',
            'Memorizing spelling without pronunciation'
          ],
          correctIndex: 0,
          explanation: 'Active contextual generation and shared reference notes bridge the gap between working memory and long-term spoken recall.'
        }
      ]
    }
  },
  {
    id: 6,
    number: 6,
    title: 'Error Correction & Building Student Speaking Confidence',
    category: 'Correction & Psychology',
    duration: '20 mins',
    embedUrl: 'https://www.youtube.com/embed/gU9H4Zq_X3A',
    description: 'Learn the psychology of language acquisition. Discover how to correct errors gently, eliminate speech anxiety, and build confident English speakers.',
    keyTakeaways: [
      'Affective Filter: Lowering student anxiety to unlock natural speech production',
      'Self-Correction Prompts: Guiding students to catch their own slips through visual and verbal cues',
      'The Feedback Sandwich: Highlighting what went well, providing target fixes, and ending with encouragement'
    ],
    quiz: {
      title: 'Module 6 Knowledge Check: Error Correction & Confidence',
      passingScore: 66,
      questions: [
        {
          id: 'm6_q1',
          question: 'What happens when a tutor constantly stops a student for every tiny pronunciation or article slip?',
          options: [
            'The student speaks faster and more relaxed',
            'The student experiences high anxiety, loses fluency flow, and stops speaking',
            'The student becomes fluent in 24 hours',
            'The student enjoys the lesson more'
          ],
          correctIndex: 1,
          explanation: 'Over-correction triggers a high affective filter, causing learners to freeze and second-guess every word.'
        },
        {
          id: 'm6_q2',
          question: 'What is "Elicited Self-Correction"?',
          options: [
            'The tutor gives the answer immediately',
            'The tutor uses an eyebrow raise, finger prompt, or subtle echo to let the student spot and fix their own mistake',
            'Telling the student they failed',
            'Ignoring all student errors permanently'
          ],
          correctIndex: 1,
          explanation: 'Self-correction builds autonomous linguistic awareness and empowers the learner.'
        },
        {
          id: 'm6_q3',
          question: 'How should lesson feedback always be structured?',
          options: [
            'List of 20 negative errors only',
            'Feedback Sandwich: Acknowledge strengths, give 2-3 high-leverage corrections, conclude with encouragement',
            'No feedback at all',
            'Comparing the student unfavorably to other students'
          ],
          correctIndex: 1,
          explanation: 'Balanced, positive feedback motivates students to rebook and look forward to their next session.'
        }
      ]
    }
  },
  {
    id: 7,
    number: 7,
    title: 'Task-Based Language Teaching (TBLT) & Real-World Roleplays',
    category: 'Communicative Methodology',
    duration: '23 mins',
    embedUrl: 'https://www.youtube.com/embed/O8u4J5GvhDk',
    description: 'Design engaging, outcome-driven communicative tasks: job interview simulations, business negotiations, travel dilemmas, and academic discussions.',
    keyTakeaways: [
      'Pre-Task (5 mins): Activating schema and pre-teaching essential vocabulary',
      'Task Cycle (25 mins): Interactive simulation where the student solves a real-life challenge',
      'Post-Task Language Focus (15 mins): Analyzing language choices and refining expressions'
    ],
    quiz: {
      title: 'Module 7 Knowledge Check: Task-Based Teaching',
      passingScore: 66,
      questions: [
        {
          id: 'm7_q1',
          question: 'What is the core philosophy of Task-Based Language Teaching (TBLT)?',
          options: [
            'Students learn language by using it to achieve a concrete, meaningful communication goal',
            'Students learn language solely by translating grammar rules',
            'Students must write code in Python',
            'Students listen to the teacher talk for 45 minutes'
          ],
          correctIndex: 0,
          explanation: 'TBLT focuses on authentic language use to accomplish practical tasks like ordering food, pitching an idea, or resolving a conflict.'
        },
        {
          id: 'm7_q2',
          question: 'During a job interview roleplay simulation, what should the tutor do?',
          options: [
            'Interrupt every sentence to explain grammar theory',
            'Act as the hiring manager, ask probing questions, and discretely log language points for the post-task review',
            'Leave the computer',
            'Speak in their native language'
          ],
          correctIndex: 1,
          explanation: 'The tutor participates in the simulation to keep it authentic, saving language analysis for the post-task feedback phase.'
        },
        {
          id: 'm7_q3',
          question: 'Why is TBLT especially popular among working professionals and adult learners?',
          options: [
            'It delivers immediate, practical competence for their everyday career and travel needs',
            'It has no homework',
            'It requires zero speaking',
            'It only teaches Shakespearean English'
          ],
          correctIndex: 0,
          explanation: 'Adult learners want tangible return on investment: passing interviews, leading meetings, and traveling confidently.'
        }
      ]
    }
  },
  {
    id: 8,
    number: 8,
    title: 'Conducting Engaging 1-on-1 Lessons via Google Meet / Zoom',
    category: 'Online Tutoring Technology',
    duration: '22 mins',
    embedUrl: 'https://www.youtube.com/embed/kY14yP5N_Lw',
    description: 'Master your virtual classroom setup on Google Meet. Learn screen sharing, interactive whiteboards, collaborative Google Docs, and technical troubleshooting.',
    keyTakeaways: [
      'Studio Presence: Professional lighting, crisp microphone audio, and eye-level camera alignment',
      'Collaborative Notes: Live-typing student vocabulary and corrections in a shared document',
      'Visual Stimuli: Utilizing digital prompt cards, short video clips, and infographics'
    ],
    quiz: {
      title: 'Module 8 Knowledge Check: Online Lesson Delivery',
      passingScore: 66,
      questions: [
        {
          id: 'm8_q1',
          question: 'What is the most professional setup for online video lessons on Google Meet?',
          options: [
            'Dim lighting, background noise, and looking down at a phone screen',
            'Clear front lighting, eye-level camera, dedicated headset microphone, and clean background',
            'Turning off your video camera permanently',
            'Taking calls while driving'
          ],
          correctIndex: 1,
          explanation: 'High audio-visual quality establishes trust, authority, and ensures accurate phonetic modeling.'
        },
        {
          id: 'm8_q2',
          question: 'How should you share new words, corrections, and lesson notes with your student during a live video call?',
          options: [
            'Type them into a shared live Google Doc or in-call chatbox so the student has a permanent reference',
            'Expect the student to memorize everything mentally without writing anything',
            'Write them on paper and hold them up to the camera briefly',
            'Send an email 3 weeks later'
          ],
          correctIndex: 0,
          explanation: 'Shared real-time digital notes provide clarity during the call and serve as a structured revision log for the student.'
        },
        {
          id: 'm8_q3',
          question: 'If you experience unexpected internet lag or audio distortion on Google Meet, what is the best immediate response?',
          options: [
            'Panic and disconnect the call',
            'Stay calm, use the text chat to communicate, turn off heavy screen shares, and resume smoothly',
            'Blame the student angrily',
            'Cancel all future bookings'
          ],
          correctIndex: 1,
          explanation: 'Calm, composed technical handling reassures the student and keeps the lesson productive.'
        }
      ]
    }
  },
  {
    id: 9,
    number: 9,
    title: 'High-Converting Free 20-Min Trials & Student Onboarding',
    category: 'Student Onboarding & Trials',
    duration: '25 mins',
    embedUrl: 'https://www.youtube.com/embed/z4T1qU6y9bI',
    description: 'Learn how offering an optional Free 20-Minute Trial can skyrocket your student bookings. Master the 20-minute trial framework to convert new students into multi-lesson packages.',
    keyTakeaways: [
      'Minutes 0-5: Warm welcome, rapport, and identifying student goals & struggles',
      'Minutes 5-15: Mini-lesson delivering an immediate breakthrough or pronunciation win',
      'Minutes 15-20: Personalized learning roadmap and presenting 5 or 10-class booking packages'
    ],
    quiz: {
      title: 'Module 9 Knowledge Check: Free 20-Min Trial Strategy',
      passingScore: 66,
      questions: [
        {
          id: 'm9_q1',
          question: 'Why do top-earning online tutors choose to offer an optional Free 20-Minute Trial class?',
          options: [
            'Because it removes student hesitation, demonstrates teaching value, and converts up to 80% into multi-class packages',
            'Because they want to work for free indefinitely',
            'Because platform rules make it mandatory for everyone',
            'Because 20 minutes is enough to teach the entire English language'
          ],
          correctIndex: 0,
          explanation: 'A 20-minute trial builds trust, establishes chemistry, and provides the perfect platform to pitch 5 or 10-lesson packages.'
        },
        {
          id: 'm9_q2',
          question: 'What is the most crucial element to deliver during the middle 10 minutes of a 20-min trial?',
          options: [
            'A comprehensive grammar test with 100 questions',
            'A quick "Mini-Win" that solves a specific speaking or pronunciation obstacle for the student',
            'Talking about your personal life for 10 minutes',
            'Reading legal disclaimers'
          ],
          correctIndex: 1,
          explanation: 'Delivering an immediate, tangible mini-win proves your teaching expertise and leaves the student eager for more.'
        },
        {
          id: 'm9_q3',
          question: 'How should you close the final 5 minutes of a free trial session?',
          options: [
            'Say goodbye without discussing future lessons',
            'Present a personalized 3-month roadmap and recommend booking a 5 or 10-lesson package to achieve their target fluency',
            'Ask the student to pay cash on the spot',
            'Tell the student they have too many mistakes to learn English'
          ],
          correctIndex: 1,
          explanation: 'Framing lessons as a structured roadmap makes booking 5 or 10 classes the obvious next step for the student.'
        }
      ]
    }
  },
  {
    id: 10,
    number: 10,
    title: 'Tutor Monetization, Package Pricing (1, 5, 10 Classes), Retention & Ethics',
    category: 'Monetization, Packages & Certification',
    duration: '26 mins',
    embedUrl: 'https://www.youtube.com/embed/yP5JtL1S8mQ',
    description: 'Learn how to set your 45-min rates ($20–$50+/45 min), structure 5-lesson and 10-lesson packages, maintain high student retention, manage wallet leads, and claim your Teaching Certificate!',
    keyTakeaways: [
      'Pricing Architecture: Setting competitive 45-min rates and offering structured 5 & 10-lesson package incentives',
      'Wallet & Lead Management: Keeping a healthy funded balance (min $10) for continuous student leads ($1.50/inquiry)',
      'Retention & Rebooking: Punctuality, structured progress reports, and professional student relationships'
    ],
    quiz: {
      title: 'Module 10 Final Knowledge Check: Monetization & Professional Standards',
      passingScore: 66,
      questions: [
        {
          id: 'm10_q1',
          question: 'Why do students prefer purchasing 5-class or 10-class packages over single classes?',
          options: [
            'Because packages provide guaranteed schedule slots, structured fluency milestones, and bundled value',
            'Because single classes are illegal',
            'Because teachers only teach once a year',
            'Because packages expire in 1 hour'
          ],
          correctIndex: 0,
          explanation: 'Packages foster long-term commitment and provide a clear milestone progression for student fluency.'
        },
        {
          id: 'm10_q2',
          question: 'How does the platform wallet and student inquiry system work for active teachers?',
          options: [
            'Teachers must pay $500 upfront per month',
            'Teachers maintain a funded balance (min $10.00), and a small lead fee ($1.50) is deducted when an interested student reaches out/books',
            'Students pay the platform, and teachers are never paid',
            'Wallet balances are wiped out every 24 hours'
          ],
          correctIndex: 1,
          explanation: 'The transparent pay-per-lead model ($1.50 per genuine booking/inquiry) ensures tutors only invest when receiving real student inquiries.'
        },
        {
          id: 'm10_q3',
          question: 'What must you do to earn and download your official Spoken English & Online Pedagogy Instructor Certificate?',
          options: [
            'Pay $1,000 for a printed diploma',
            'Complete all 10 training modules and pass each module’s knowledge check quiz',
            'Write a 50-page dissertation',
            'Wait 5 years'
          ],
          correctIndex: 1,
          explanation: 'Completing all 10 modules and passing the quizzes verifies your pedagogical competency and automatically generates your verified Certificate.'
        }
      ]
    }
  }
];

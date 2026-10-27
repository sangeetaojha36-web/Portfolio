export interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  year: string;
  category: 'AI & Machine Learning' | 'Web & Interactive' | 'Systems & Tools';
  description: string;
  longDescription: string;
  role: string;
  context: string;
  technologies: { name: string; iconClass?: string }[];
  link?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
  vignetteIcon: string;
  metrics?: { label: string; value: string }[];
  highlights: string[];
}

export interface PlaygroundStudy {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  type: 'nlp' | 'stargazer' | 'cardflip' | 'neural';
}

export interface Internship {
  role: string;
  company: string;
  partner: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  skillsGained: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
  status: string;
  highlights?: string[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  description: string;
  skills: { name: string; proficiency: string; note: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Sangeeta Ojha',
    title: 'AI / ML & Software Developer',
    location: 'Bhilai, Chhattisgarh, India',
    timezone: 'Asia/Kolkata',
    phone: '+91 7879041755',
    email: 'sangeetaojha36@gmail.com',
    resumePdfPath: '/assets/aistudio/Sangeeta_Ojha_Resume24_e8a52240.pdf',
    statement: 'I build thoughtful AI systems and full-stack software where mathematical rigor meets human intuition.',
    heroDescription: 'Final-year Computer Science Engineering student at CSIT Durg. Merging applied machine learning in Python with modern web engineering to craft empathetic digital products — from conversational health companions to intelligent evaluation engines.',
    philosophy: [
      {
        title: 'Systems & Structure',
        desc: 'Good engineering begins with clean architecture. Whether designing database schemas, NLP inference pipelines, or component systems, structure enables resilience.'
      },
      {
        title: 'Empathy in Machine Learning',
        desc: 'AI should empower and soothe human users, not overwhelm them. My work on Serenity and AI Interviewer emphasizes ethical metrics and supportive feedback loops.'
      },
      {
        title: 'The Tactile Craft',
        desc: 'Beyond screens, I explore crochet and physical crafting. That patience with tactile threads directly informs how I write modular, clean code.'
      }
    ],
    personBehind: {
      intro: "I'm a developer with a quiet obsession for the space where algorithms and human experiences overlap.",
      storyParagraph1: "Growing up in Bhilai, Chhattisgarh, I was drawn to the logical elegance of computer science and the tactile creativity of handcrafts. As a final-year CSE student at CSIT Durg, I channel both mindsets: building robust machine learning pipelines while obsessing over micro-interactions and empathetic product details.",
      storyParagraph2: "During my Virtual Internship with IBM SkillsBuild × BharatCares (with AICTE), I built the AI Skill Mentor, exploring how AI can directly serve the UN Sustainable Development Goals. On campus, as Vice President of The SEnA (Institutional Students Association), I mentor peers and coordinate workshops bridging academic theory with hands-on building.",
      storyParagraph3: "When my IDE is closed, you'll find me crocheting intricate patterns, testing emerging generative AI models, or learning new frameworks."
    }
  },
  projects: [
    {
      id: 'ai-interviewer',
      number: '01',
      name: 'AI Interviewer',
      subtitle: 'Mock Interview & Scoring Platform',
      year: '2026',
      category: 'AI & Machine Learning',
      role: 'Lead ML & Backend Developer',
      context: 'Independent Engineering Project',
      description: 'An AI-powered mock interview system that generates role-based questions and evaluates voice or text answers with an NLP scoring pipeline.',
      longDescription: 'Engineered to reduce candidate anxiety and accelerate interview readiness. The platform presents customized question sets for Software Developer, Data Analyst, AI/ML Engineer, Web Developer, and HR tracks. Candidates answer through live speech or text, which flows into an NLP feature extraction pipeline measuring technical relevancy, fluency, and structural coherence. Comprehensive feedback reports track score trajectory across successive practice sessions.',
      technologies: [
        { name: 'Python', iconClass: 'fab fa-python' },
        { name: 'Flask', iconClass: 'fas fa-flask' },
        { name: 'scikit-learn', iconClass: 'fas fa-cogs' },
        { name: 'NLP', iconClass: 'fas fa-brain' }
      ],
      link: 'https://github.com/sangeetaojha36-web',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: true,
      accentColor: '#C46D4E',
      vignetteIcon: 'fa-microphone-lines',
      metrics: [
        { label: 'Domains Covered', value: '5 Key Roles' },
        { label: 'Evaluation Pipeline', value: 'NLP Scoring' }
      ],
      highlights: [
        'Role-targeted question generators for technical & behavioral scenarios',
        'Dual speech-to-text audio ingestion and manual text submission',
        'scikit-learn and NLP pipeline providing granular feedback',
        'Progress metrics across sessions to quantify skill readiness'
      ]
    },
    {
      id: 'serenity-wellness',
      number: '02',
      name: 'Serenity',
      subtitle: 'Mental Health & Wellness Platform',
      year: '2026',
      category: 'AI & Machine Learning',
      role: 'Full-Stack Developer & Designer',
      context: 'Human-Centered AI Product',
      description: 'Mental wellness web platform with an AI companion chatbot (Sera), interactive 3D games, habit rewards, and celestial star-gazing.',
      longDescription: 'Serenity was born from the belief that digital mental health support should be engaging, poetic, and non-judgmental. It pairs Sera, an empathetic conversational companion, with interactive mindfulness games (featuring particle physics, 3D card flips, and confetti celebration). A proof-based daily task rewards engine encourages healthy offline habits (with optional digital detox lockouts), complemented by a gratitude journal and a peaceful real-constellation star-gazing module.',
      technologies: [
        { name: 'JavaScript', iconClass: 'fab fa-js' },
        { name: 'HTML & CSS', iconClass: 'fab fa-html5' },
        { name: 'AI Companion (Sera)', iconClass: 'fas fa-robot' },
        { name: 'Interactive 3D / Particles', iconClass: 'fas fa-sparkles' },
        { name: 'Doctors Directory', iconClass: 'fas fa-user-doctor' }
      ],
      link: 'https://github.com/sangeetaojha36-web',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: true,
      accentColor: '#3E6B99',
      vignetteIcon: 'fa-heart-pulse',
      metrics: [
        { label: 'Companion Bot', value: 'Sera (24/7)' },
        { label: 'Mindfulness Mode', value: 'Star-Gazer' }
      ],
      highlights: [
        'AI companion chatbot (Sera) trained for active empathetic listening',
        'Gamified wellness with particle simulations, 3D card flips, and celebration confetti',
        'Proof-based daily tasks rewards system with digital detox lockouts',
        'Rotating prompt gratitude journal and interactive night-sky constellations'
      ]
    },
    {
      id: 'ai-skill-mentor',
      number: '03',
      name: 'AI Skill Mentor',
      subtitle: 'IBM SkillsBuild × BharatCares AI Project',
      year: '2026',
      category: 'AI & Machine Learning',
      role: 'Machine Learning Intern',
      context: 'IBM SkillsBuild × BharatCares with AICTE',
      description: 'AI-based skill accelerator and mentorship engine aligned with UN Sustainable Development Goals (SDG 4 & 8).',
      longDescription: 'Built as the capstone achievement during the Machine Learning & Applied AI virtual internship. AI Skill Mentor diagnoses learners\' technical competencies, highlights gaps against curriculum benchmarks, and prescribes personalized learning paths using supervised classification and affinity algorithms. Directly designed to support UN SDG 4 (Quality Education) and SDG 8 (Decent Work and Economic Growth).',
      technologies: [
        { name: 'Python', iconClass: 'fab fa-python' },
        { name: 'scikit-learn', iconClass: 'fas fa-cogs' },
        { name: 'Pandas & NumPy', iconClass: 'fas fa-table' },
        { name: 'UN SDGs Framework', iconClass: 'fas fa-globe' }
      ],
      link: 'https://github.com/sangeetaojha36-web',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: true,
      accentColor: '#447055',
      vignetteIcon: 'fa-compass',
      metrics: [
        { label: 'Internship Body', value: 'IBM SkillsBuild' },
        { label: 'Global Alignment', value: 'UN SDGs 4 & 8' }
      ],
      highlights: [
        'Built during the IBM SkillsBuild × BharatCares with AICTE internship',
        'Assignments and architecture mapped to UN Sustainable Development Goals',
        'Applied supervised, unsupervised, and reinforcement learning principles'
      ]
    },
    {
      id: 'career-sync-ai',
      number: '04',
      name: 'Career Path Recommendation',
      subtitle: 'AI Career Trajectory Engine',
      year: '2025',
      category: 'AI & Machine Learning',
      role: 'Frontend & Algorithm Developer',
      context: 'Live Web App on Vercel',
      description: 'Intelligent career path recommender analyzing student skills, interests, and academic background to map optimal tech roles.',
      longDescription: 'Helps students navigate the overwhelming tech landscape. By evaluating current programming competencies, theoretical coursework, and individual curiosity, the recommendation engine calculates weighted compatibility scores for Web Engineering, AI/ML, Cloud DevOps, and Data Science, paired with concrete milestones and resources.',
      technologies: [
        { name: 'HTML & CSS', iconClass: 'fab fa-html5' },
        { name: 'JavaScript', iconClass: 'fab fa-js' },
        { name: 'AI Recommender', iconClass: 'fas fa-route' }
      ],
      link: 'https://career-sync-ai-rho.vercel.app/',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: false,
      accentColor: '#8C6849',
      vignetteIcon: 'fa-graduation-cap',
      metrics: [
        { label: 'Status', value: 'Live on Vercel' },
        { label: 'Output', value: 'Personal Roadmaps' }
      ],
      highlights: [
        'Evaluates student background, coding familiarity, and personal career goals',
        'Calculates weighted domain compatibility ratings with tailored milestone checklists',
        'Live responsive web deployment on Vercel'
      ]
    },
    {
      id: 'food-express',
      number: '05',
      name: 'Food Express',
      subtitle: 'Real-time Food Ordering Platform',
      year: '2025',
      category: 'Web & Interactive',
      role: 'Full-Stack Developer',
      context: 'Live Web App on Vercel',
      description: 'Modern food delivery platform with live order tracking, dynamic menu management, and Firebase cloud synchronization.',
      longDescription: 'A responsive full-stack platform featuring instant cart state recalculations, category filtering, live order status updates, and Firebase cloud database integration.',
      technologies: [
        { name: 'JavaScript', iconClass: 'fab fa-js' },
        { name: 'HTML5 & CSS3', iconClass: 'fab fa-html5' },
        { name: 'Firebase Firestore', iconClass: 'fas fa-database' }
      ],
      link: 'https://food-express-beta-neon.vercel.app/',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: false,
      accentColor: '#D97706',
      vignetteIcon: 'fa-utensils',
      highlights: [
        'Real-time order tracking status updates via Firebase',
        'Dynamic interactive cart with instant price recalculations',
        'Mobile-first responsive design'
      ]
    },
    {
      id: 'taskvibe',
      number: '06',
      name: 'TaskVibe',
      subtitle: 'Modern Task Management Application',
      year: '2025',
      category: 'Systems & Tools',
      role: 'Frontend Developer',
      context: 'Live Web App on Vercel',
      description: 'Minimalist task management application with priority scoring, status boards, and offline LocalStorage persistence.',
      longDescription: 'Created for distraction-free focus. Includes priority filtering, inline editing, task archiving, and zero-latency local state persistence.',
      technologies: [
        { name: 'JavaScript', iconClass: 'fab fa-js' },
        { name: 'HTML5 & CSS3', iconClass: 'fab fa-html5' },
        { name: 'LocalStorage API', iconClass: 'fas fa-box-archive' }
      ],
      link: 'https://task-vibe-brown.vercel.app/',
      githubUrl: 'https://github.com/sangeetaojha36-web',
      featured: false,
      accentColor: '#2563EB',
      vignetteIcon: 'fa-list-check',
      highlights: [
        'Offline-first LocalStorage synchronization',
        'Priority tagging and category sorting',
        'Clean responsive user experience'
      ]
    }
  ] as Project[],
  playground: [
    {
      id: 'nlp-scorer',
      title: 'NLP Answer Evaluator',
      subtitle: 'Vignette 01 • Natural Language Processing',
      tag: 'Interactive NLP Study',
      description: 'Test how the scoring engine behind AI Interviewer evaluates responses based on keyword depth, technical substance, and clarity.',
      type: 'nlp'
    },
    {
      id: 'stargazer',
      title: 'Serenity Star-Gazer',
      subtitle: 'Vignette 02 • Canvas & Celestial Constellations',
      tag: 'Mindfulness Canvas',
      description: 'An interactive study from the Serenity mental wellness platform. Click and drag across the night sky to draw constellation connections.',
      type: 'stargazer'
    },
    {
      id: 'card-flip',
      title: '3D Card Physics & Confetti',
      subtitle: 'Vignette 03 • Gamified Micro-Interactions',
      tag: 'Interactive Motion',
      description: 'Study of tactile feedback and physical card depth from Serenity\'s daily task reward system. Flip the card to trigger rewarding celebration physics.',
      type: 'cardflip'
    },
    {
      id: 'neural-network',
      title: 'Neural Synapse Simulator',
      subtitle: 'Vignette 04 • Machine Learning Graph',
      tag: 'Interactive AI Architecture',
      description: 'Explore neural forward-propagation with live synaptic pulses, adjustable learning rate parameters, and animated weight activations.',
      type: 'neural'
    }
  ] as PlaygroundStudy[],
  internships: [
    {
      role: 'Machine Learning & Applied AI Intern (Virtual)',
      company: 'IBM SkillsBuild × BharatCares',
      partner: 'with AICTE',
      period: '24 Aug – 30 Sep 2026',
      location: 'Virtual / Remote',
      type: 'Technical Virtual Internship',
      description: 'Completed rigorous project-based learning in machine learning algorithms, deep learning fundamentals, and applied AI systems.',
      achievements: [
        'Built "AI Skill Mentor", an AI-based project, as part of the internship curriculum.',
        'Completed project-based assignments aligned with the UN Sustainable Development Goals (SDGs).',
        'Learned and applied supervised, unsupervised, deep and reinforcement learning on real-world problems.'
      ],
      skillsGained: ['Machine Learning', 'Python', 'scikit-learn', 'Supervised & Unsupervised Learning', 'Deep & Reinforcement Learning', 'UN SDGs']
    }
  ] as Internship[],
  education: [
    {
      degree: 'B.Tech, Computer Science & Engineering',
      institution: 'CSIT, Durg',
      period: '2023 – 2027',
      score: '7.8 / 10',
      scoreLabel: 'CGPA',
      status: 'Final-Year CSE Student',
      highlights: [
        'Specialization in Full-Stack Web Development, Data Structures, and Applied AI.',
        'Vice President of the Institutional Students Association (The SEnA) for 2026–27.',
        'Selected to lead student technical and cultural activities at the institute.'
      ]
    },
    {
      degree: 'Class XII',
      institution: 'Govt. HSS, Bhilai',
      period: '2022',
      score: '65.5%',
      scoreLabel: 'Score',
      status: 'Science Stream'
    },
    {
      degree: 'Class X',
      institution: 'Govt. HSS, Bhilai',
      period: '2020',
      score: '86%',
      scoreLabel: 'Score',
      status: 'Distinction'
    }
  ] as Education[],
  leadership: [
    {
      role: 'Vice President',
      organization: 'Institutional Students Association (The SEnA)',
      period: 'CSIT Durg • 2026 – 27',
      badge: 'Student Leadership',
      description: 'Selected to lead student activities at the institute for the 2026–27 academic year.',
      highlights: [
        'Leading student activities across CSIT Durg for the 2026–27 academic session.',
        'Organizing peer workshops on emerging AI tools, programming fundamentals, and project building.',
        'Fostering collaboration between faculty and student developers.'
      ]
    },
    {
      role: 'Vocational Training & Technical Workshops',
      organization: 'Web Development, AI & Machine Learning',
      period: 'Certified',
      badge: 'Technical Training',
      description: 'Vocational training covering modern web engineering, AI model lifecycles, and technical workshops.',
      highlights: [
        'Applied full-stack development and responsive design architectures.',
        'Model prototyping and evaluation using scikit-learn and Python.'
      ]
    }
  ] as LeadershipItem[],
  skillGroups: [
    {
      category: 'Languages',
      icon: 'fa-code',
      description: 'Core syntax and algorithmic thinking',
      skills: [
        { name: 'Python', proficiency: 'Advanced', note: 'AI/ML, Flask, script automation' },
        { name: 'JavaScript', proficiency: 'Advanced', note: 'ES6+, DOM, asynchronous React UI' },
        { name: 'Java', proficiency: 'Intermediate', note: 'OOP principles, data structures' },
        { name: 'C & C++', proficiency: 'Intermediate', note: 'Core CS fundamentals, memory logic' }
      ]
    },
    {
      category: 'AI / Machine Learning',
      icon: 'fa-brain',
      description: 'Statistical models, NLP & applied data',
      skills: [
        { name: 'scikit-learn', proficiency: 'Advanced', note: 'Classification, regression, evaluation' },
        { name: 'NLP', proficiency: 'Advanced', note: 'Text tokenization, sentiment scoring' },
        { name: 'NumPy & Pandas', proficiency: 'Advanced', note: 'Data wrangling & exploratory analysis' },
        { name: 'Supervised & Unsupervised', proficiency: 'Intermediate', note: 'Deep & reinforcement concepts' }
      ]
    },
    {
      category: 'Web & Interfaces',
      icon: 'fa-laptop-code',
      description: 'Fluid component systems & server APIs',
      skills: [
        { name: 'HTML & CSS', proficiency: 'Advanced', note: 'Semantic structure, grid/flexbox, animations' },
        { name: 'Flask', proficiency: 'Intermediate', note: 'RESTful API routing, model serving' },
        { name: 'React', proficiency: 'Intermediate', note: 'Component state, modular systems' },
        { name: 'Responsive Design', proficiency: 'Advanced', note: 'Mobile-first, accessible experiences' }
      ]
    },
    {
      category: 'Database, Tools & Core CS',
      icon: 'fa-database',
      description: 'Persistence, workflows & foundational CS',
      skills: [
        { name: 'MySQL', proficiency: 'Intermediate', note: 'Relational schemas, SQL queries' },
        { name: 'Git & GitHub', proficiency: 'Advanced', note: 'Version control, repositories' },
        { name: 'VS Code', proficiency: 'Advanced', note: 'Daily IDE, terminal tooling' },
        { name: 'Core CS', proficiency: 'Advanced', note: 'OOP, DBMS, OS, Computer Networks' }
      ]
    }
  ] as SkillGroup[],
  spokenLanguages: ['English', 'Hindi'],
  interests: ['Content creation', 'Crochet & crafting', 'Exploring new AI tools'],
  training: [
    'Vocational training: Web Development, AI & Machine Learning',
    'Technical workshops'
  ],
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sangeeta-ojha-a3a8a82a0',
      icon: 'fab fa-linkedin',
      displayUser: 'in/sangeeta-ojha-a3a8a82a0'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/sangeetaojha36-web',
      icon: 'fab fa-github',
      displayUser: 'github.com/sangeetaojha36-web'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sangeetafiied?obrf=Nnh2dGlpeHR0M2Zy',
      icon: 'fab fa-instagram',
      displayUser: '@sangeetafiied'
    }
  ]
};

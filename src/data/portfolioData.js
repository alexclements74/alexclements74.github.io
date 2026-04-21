export const profile = {
  name: 'Alex Clements',
  role: 'Full-Stack Developer',
  location: 'Ottawa, Ontario, Canada',
  email: 'alex.clements.cci@gmail.com',
  headlineTag: 'Full-Stack Developer • Udemy Instructor',
  headline: 'Building practical applications for good.',
  intro:
    'I design and create a variety of digital experiences that help solve real-world problems and people.',
  about:
    'I enjoy working on projects that have a positive impact, whether that\'s improving user experiences, streamlining workflows, or building tools that empower change. I\'m passionate about learning new technologies and assisting others in their development journeys.',
  quickFacts: [
    {
      label: 'Years Building',
      value: '8+',
    },
    {
      label: 'Applications Developed',
      value: '30+',
    },
    {
      label: 'Students Taught',
      value: '100+',
    },
  ],
}

export const focusAreas = [
  {
    title: 'Design-Focused Frontend',
    description:
      'Translate user and business goals into intuitive UI flows with clear hierarchy and accessible design.',
  },
  {
    title: 'Reliable Backend Systems',
    description:
      'Design and implement scalable server-side solutions with a focus on performance, security, and maintainability.',
  },
  {
    title: 'Teaching and Mentorship',
    description:
      'Share knowledge and guide others in their learning journeys through online courses and user-specific support.',
  },
]

export const projectHighlights = [
  {
    featured: true,
    title: 'Embodied Assistant',
    year: '2026',
    summary:
      'Multimodal assistant application for seamless, useful human-computer interaction.',
    // impact: '',
    image: {
      src: '/project-embodied-assistant.svg',
      alt: 'Embodied Assistant UI screenshot',
    },
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'LLMs', 'Speech Recognition'],
    links: [
    //   {
    //     label: 'Demo Video',
    //     url: 'https://example.com',
    //   },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/alexclements74/embodied-assistant',
      },
    ],
  },
  {
    featured: true,
    title: 'Supervrket',
    year: '2025',
    summary:
      'A Unity-based VR game in which you complete various levels as a supermarket cashier.',
    // impact: '',
    image: {
      src: '/project-supervrket.svg',
      alt: 'Supervrket VR game screenshot',
    },
    stack: ['Unity', 'C++', 'VR', 'C#'],
    links: [
    //   {
    //     label: 'Demo Video',
    //     url: 'https://example.com',
    //   },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/alexclements74/supervrket',
      },
    ],
  },
  {
    featured: true,
    title: 'Enroll',
    year: '2022',
    summary:
      'An Android app for managing and tracking educational courses.',
    // impact: '',
    image: {
      src: '/project-enroll.svg',
      alt: 'Enroll Android app screenshot',
    },
    stack: ['Java', 'Mobile Development', 'Android Studio'],
    links: [
    //   {
    //     label: 'Demo',
    //     url: 'https://example.com',
    //   },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/alexclements74/Enroll',
      },
    ],
  },
  {
    featured: true,
    title: 'Booker',
    year: '2022',
    summary:
      'A modern hotel booking platform built with a PERN stack.',
    // impact: '',
    image: {
      src: '/project-booker.svg',
      alt: 'Booker hotel booking platform screenshot',
    },
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js', 'JavaScript'],
    links: [
    //   {
    //     label: 'Demo Video',
    //     url: 'https://example.com',
    //   },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/alexclements74/Booker',
      },
    ],
  },
]

export const experience = [
  {
    role: 'Curriculum Developer',
    company: 'Claremont Communications',
    location: 'Ottawa, ON',
    period: '2023 & 2025',
    summary:
      'Developed curriculum materials and published software development courses.',
    highlights: [
      'Independently developed both a Python for Databases course and an SQL for Beginners course.',
      'Updated and expanded various pre-existing courses.',
      'Instructed a client on optimal methods for their software systems.',
    ],
    stack: ['Python', 'PostgreSQL', 'React', 'Node.js'],
  },
  {
    role: 'Deputy Information Management Officer',
    company: 'Department of National Defence (Canada)',
    location: 'Ottawa, ON',
    period: '2024 - 2025',
    summary:
      'Built and maintained digital information systems for operational efficiency.',
    highlights: [
      'Created an Office Map app, connected to both Power BI and Power Apps.',
      'Worked with Microsoft 365 to build & automate various business processes.',
      'Advised colleagues on best practices for efficient, agile development.',
    ],
    stack: ['Power BI', 'Power Apps', 'Microsoft 365', 'Power Automate'],
  },
]

export const education = [
  {
    program: 'Honours BSc Computer Science',
    institution: 'University of Ottawa',
    location: 'Ottawa, ON',
    period: '2021 - 2026',
    details:
      'Focused on software design, web application development, databases, and practical team projects.',
    coursework: ['Software Engineering', 'Database Design', 'Web Development', 'Algorithms'],
  },
  // potentially add high school here later
]

export const courses = [
  {
    title: 'Python for Databases: Learning Data Management with Python',
    platform: 'Udemy',
    year: 'Published',
    // description:
    //   "Realize Python's potential to connect to and utilize a variety of database management systems.",
    summary:
      'A hands-on introduction to data management workflows using Python with practical database integration examples.',
    stats: '4.6 rating • 14 ratings • 2.5 hours • 43 lectures',
    topics: ['Python', 'SQL', 'Data Management', 'RDBMS Integration'],
    url: 'https://www.udemy.com/course/python-for-databases/',
  },
  {
    title: 'SQL For Beginners - Essential Query Skills',
    platform: 'Udemy',
    year: 'Published',
    // description:
    //   'Master SELECT statements, WHERE clauses, aggregates, and joins for effective data retrieval.',
    summary:
      'A beginner-focused SQL fundamentals course that emphasizes practical querying patterns used in real projects.',
    stats: '4.2 rating • 11 ratings • 2 hours • 41 lectures',
    topics: ['SQL', 'PostgreSQL', 'RDBMS\'', 'Database Fundamentals'],
    url: 'https://www.udemy.com/course/sql-for-beginners-essential-query-skills/',
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Accessibility'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'Auth Patterns'],
  },
  {
    category: 'Data',
    items: ['SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'Power Platform'],
  },
  {
    category: 'Video Game Dev',
    items: ['Unity', 'C#', 'XR', 'VR', 'Game Design'],
  },
  {
    category: 'Systems',
    items: ['Windows', 'macOS', 'Linux', 'AWS', 'Oracle Cloud'],
  },
  {
    category: 'Tools + Delivery',
    items: ['Git/GitHub', 'Vite', 'CI/CD', 'Docker', 'Agile Collaboration'],
  },
]

export const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/alexclements74',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alexclements74/',
  },
//   {
//     label: 'Email',
//     url: 'mailto:alex.clements.cci@gmail.com',
//   },
  {
    label: 'Resume',
    url: '_',
  },
  {
    label: 'Udemy',
    url: 'https://www.udemy.com/user/alex-clements-11/',
  }
]

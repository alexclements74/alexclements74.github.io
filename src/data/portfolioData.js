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
    title: 'Pulse Commerce Dashboard',
    year: '2026',
    summary:
      'A modular analytics suite for e-commerce teams with custom reports, KPI alerts, and role-based layouts.',
    impact: 'Reduced support tickets by 28% after launch.',
    image: {
      src: '/project-pulse-dashboard.svg',
      alt: 'Analytics dashboard screenshot with KPI cards and charts',
    },
    stack: ['React', 'TypeScript', 'TanStack Query', 'Recharts'],
    links: [
      {
        label: 'Case Study',
        url: 'https://example.com',
      },
      {
        label: 'Code',
        url: 'https://github.com',
      },
    ],
  },
  {
    featured: true,
    title: 'Lighthouse Booking Platform',
    year: '2025',
    summary:
      'A mobile-first booking flow for service businesses with dynamic pricing and frictionless multi-step checkout.',
    impact: 'Improved checkout completion by 19%.',
    image: {
      src: '/project-lighthouse-booking.svg',
      alt: 'Service booking UI screenshot with calendar and checkout flow',
    },
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    links: [
      {
        label: 'Live Site',
        url: 'https://example.com',
      },
      {
        label: 'Details',
        url: 'https://example.com',
      },
    ],
  },
  {
    featured: true,
    title: 'Signal Portfolio CMS',
    year: '2024',
    summary:
      'A lightweight content management setup for portfolio sites with markdown entries and reusable page blocks.',
    impact: 'Cut content update time from hours to minutes.',
    stack: ['React', 'Vite', 'Supabase', 'Netlify'],
    links: [
      {
        label: 'Demo',
        url: 'https://example.com',
      },
      {
        label: 'GitHub',
        url: 'https://github.com',
      },
    ],
  },
  {
    featured: true,
    title: 'Atlas Field Ops Mobile',
    year: '2024',
    summary:
      'A cross-platform field operations app for dispatch, inspections, and offline-first reporting.',
    impact: 'Reduced average on-site reporting time by 31%.',
    stack: ['React Native', 'Expo', 'GraphQL', 'SQLite'],
    links: [
      {
        label: 'Project Notes',
        url: 'https://example.com',
      },
      {
        label: 'Code Sample',
        url: 'https://github.com',
      },
    ],
  },
  {
    featured: true,
    title: 'CareBridge Intake Portal',
    year: '2023',
    summary:
      'A guided intake portal for social services teams with eligibility logic, role permissions, and audit trails.',
    impact: 'Cut intake completion time from 22 minutes to 11 minutes.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    links: [
      {
        label: 'Overview',
        url: 'https://example.com',
      },
      {
        label: 'Architecture',
        url: 'https://example.com',
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
    description:
      "Realize Python's potential to connect to and utilize a variety of database management systems.",
    summary:
      'A hands-on introduction to data management workflows using Python with practical database integration examples.',
    stats: '4.6 rating • 14 ratings • 2.5 hours • 43 lectures',
    topics: ['Python', 'SQL', 'Data Management', 'Beginner Friendly'],
    url: 'https://www.udemy.com/course/python-for-databases/',
  },
  {
    title: 'SQL For Beginners - Essential Query Skills',
    platform: 'Udemy',
    year: 'Published',
    description:
      'Master SELECT statements, WHERE clauses, aggregates, and joins for effective data retrieval.',
    summary:
      'A beginner-focused SQL fundamentals course that emphasizes practical querying patterns used in real projects.',
    stats: '4.2 rating • 11 ratings • 2 hours • 41 lectures',
    topics: ['SQL', 'Joins', 'Aggregates', 'Database Fundamentals'],
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
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Query Optimization', 'Schema Design'],
  },
  {
    category: 'Testing + Quality',
    items: ['Playwright', 'Unit Testing', 'Code Reviews', 'Performance Tuning'],
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

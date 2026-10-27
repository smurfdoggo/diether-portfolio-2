export const profile = {
  name: 'Diether Besa',
  fullName: 'Diether B. Besa',
  image: '/diether-besa-suit.png',
  title: 'Software Engineer & Full-Stack Developer',
  email: 'besadiether031@gmail.com',
  phone: '+63 915 579 7964',
  phoneHref: 'tel:+639155797964',
  location: 'Caloocan City, Philippines',
  linkedin: 'https://www.linkedin.com/in/diether-besa-31b998275',
  resume: '/Diether-Besa-Resume.pdf',
  summary:
    'Software engineer with 2 years of experience building and deploying full-stack web applications with Laravel, React, Vue.js, and MySQL. My work spans HR systems, booking platforms, payment integrations, and guiding intern developers.',
};

export const projects = [
  {
    id: 'hr-management-system',
    title: 'HR Management System',
    category: 'Business software',
    description:
      'Attendance, payroll, employee and admin management, role-based access, and subscription billing in one HR platform.',
    role: 'Lead Developer & intern mentor',
    tech: ['Laravel', 'React', 'MySQL', 'Maya', 'Brevo', 'AWS S3'],
    image: '/projects/hr-management.png',
  },
  {
    id: 'pet-booking-system',
    title: 'Pet Booking System',
    category: 'Booking platform',
    description:
      'A pet booking system built from scratch as Lead Developer, working alongside intern developers.',
    role: 'Lead Developer',
    tech: ['Laravel', 'Vue 3', 'MySQL', 'Brevo', 'AWS S3'],
    image: '/projects/pet-booking.png',
  },
  {
    id: 'music-booking-platform',
    title: 'Music Booking Platform',
    category: 'Booking platform',
    description:
      'Contributed to appointment scheduling, credit purchases, and account verification for a music booking platform.',
    role: 'Contributor',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Maya', 'Brevo', 'AWS S3'],
    image: '/projects/music-booking.png',
  },
  {
    id: 'ticketing-management-system',
    title: 'Ticketing Management System',
    category: 'Service management',
    description:
      'Role-based access, ticket lifecycle management, real-time status monitoring, and client-facing ticket submission and tracking.',
    role: 'Contributor',
    tech: ['Laravel', 'Vue 3', 'MySQL', 'Brevo', 'AWS S3'],
    image: '/projects/ticketing-management.png',
  },
  {
    id: 'admission-system',
    title: 'Admission System',
    category: 'Capstone project',
    description:
      'An admission system developed as a capstone project, with responsibility for group leadership and full-stack development.',
    role: 'Group Leader & Full-Stack Developer',
    tech: ['Next.js', 'Laravel', 'MySQL'],
    image: '/projects/admission-system.png',
  },
  {
    id: 'police-pensioners-management-system',
    title: 'Police Pensioners Management System',
    category: 'Public services',
    description:
      'Contributed to a web-based management system for retired Philippine police pensioners.',
    role: 'Contributor',
    tech: ['Laravel', 'MySQL', 'AWS S3'],
    image: '/projects/police-pensioners.png',
  },
  {
    id: 'case-monitoring-system',
    title: 'Case Monitoring System',
    category: 'Case management',
    description:
      'Added a Secretary Admin role with permissions and resolved bugs in case-monitoring workflows.',
    role: 'Contributor',
    tech: ['Laravel', 'MySQL', 'AWS S3'],
    image: '/projects/case-monitoring.png',
  },
];

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Ayahtek',
    period: 'Oct 2024 - Oct 2026',
    description:
      'Developed and deployed full-stack web applications using Laravel, React, Vue.js, Nuxt.js, and MySQL.',
    highlights: [
      'Built APIs and integrated Maya Payments, Brevo, authentication, and AWS S3.',
      'Served as Lead Developer for the HR Management and Pet Booking systems, mentoring interns and teaching code structure.',
      'Collaborated in Agile Scrum across planning, development, testing, debugging, code reviews, and deployment.',
    ],
  },
  {
    role: 'Cashier / Encoder',
    company: "Brink's Philippines",
    period: 'Mar 2022 - Mar 2023',
    description:
      'Sorted and prepared cash, maintained cash quality standards, and encoded incoming and outgoing cash bags.',
    highlights: [],
  },
];

export const skillLogos = {
  JavaScript: '/skills/javascript.svg',
  TypeScript: '/skills/typescript.svg',
  React: '/skills/react.svg',
  'Vue 3': '/skills/vuejs.svg',
  'Next.js': '/skills/nextjs.svg',
  'Nuxt.js': '/skills/nuxtjs.svg',
  'Tailwind CSS': '/skills/tailwindcss.svg',
  Redux: '/skills/redux.svg',
  Zustand: '/skills/zustand.svg',
  Pinia: '/skills/pinia.svg',
  PHP: '/skills/php.svg',
  Laravel: '/skills/laravel.svg',
  'Express.js': '/skills/express.svg',
  MySQL: '/skills/mysql.svg',
  MongoDB: '/skills/mongodb.svg',
  'Maya Payments': '/skills/maya.png',
  Brevo: '/skills/brevo.svg',
  'AWS S3': '/skills/aws.svg',
  Git: '/skills/git.svg',
  GitHub: '/skills/github.svg',
  Postman: '/skills/postman.svg',
  Codex: '/skills/codex.svg',
  'GitHub Copilot': '/skills/githubcopilot.svg',
}

export const skillGroups = [
  {
    title: 'Frontend',
    description: 'Interfaces and application state.',
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Vue 3',
      'Next.js',
      'Nuxt.js',
      'Tailwind CSS',
      'Redux',
      'Zustand',
      'Pinia',
    ],
  },
  {
    title: 'Backend & databases',
    description: 'APIs, access control, and application data.',
    skills: [
      'PHP',
      'Laravel',
      'Express.js',
      'MySQL',
      'MongoDB',
    ],
  },
  {
    title: 'Integrations',
    description: 'Payments, email, storage, and connected services.',
    skills: ['Maya Payments', 'Brevo', 'AWS S3'],
  },
  {
    title: 'Tools & workflow',
    description: 'Collaborative delivery and AI-assisted development.',
    skills: [
      'Git',
      'GitHub',
      'Postman',
      'Codex',
      'GitHub Copilot',
    ],
  },
];

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'New Era University',
  period: '2018 - 2025',
};

export const certification = {
  title: 'The Web Developer Bootcamp',
  provider: 'Udemy',
  year: '2024',
};

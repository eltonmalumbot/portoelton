export type Project = {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  summary: string;
  problem: string;
  solution: string;
  role: string[];
  features: string[];
  stack: string[];
  outcome: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  repoPrivate?: boolean;
  pluginNote?: string;
  status: string;
};

export const projects: Project[] = [
  {
    slug: "supertools",
    index: "01",
    title: "Moodle SuperTools",
    eyebrow: "Flagship · LMS Operations",
    subtitle: "Moodle administration and automation platform",
    summary: "A centralized toolkit for recurring Moodle administration across multiple school LMS environments—from bulk provisioning to cohort, course, manager, audit, and reporting workflows.",
    problem: "Manual provisioning, cohort maintenance, yearly course setup, account checks, and reporting consumed time and increased the chance of inconsistent results across Moodle environments.",
    solution: "I designed a centralized interface connected to Moodle Web Services, with preview-first bulk operations, role-aware controls, safer destructive actions, and specialized Moodle functions through a companion plugin.",
    role: ["Workflow design", "Moodle administration", "Web Services integration", "PHP / JavaScript development", "Production troubleshooting"],
    features: ["Bulk account creation with validation and preview", "Cohort creation, membership management, audit, and cleanup", "Yearly category and course structure generation", "Course cloning, selective deletion, and unenrolment workflows", "Account audit for status, roles, last login, and cohorts", "School manager administration and activity logs", "Multi-site Moodle connection management", "LMS log filtering and XLSX reporting", "Companion Moodle local plugin (local_supertools) for custom Web Service functions, category-manager operations, account auditing, and controlled course unenrolment"],
    stack: ["Moodle", "Moodle Web Services", "PHP", "JavaScript", "HTML/CSS", "SheetJS / XLSX"],
    outcome: "SuperTools turns common Moodle administrator tasks into repeatable, auditable workflows and demonstrates practical LMS operations, automation, API integration, and risk-aware system design.",
    pluginNote: "I also developed a companion Moodle local plugin, local_supertools, which exposes purpose-built Web Service functions for user auditing, enrolment management, category managers, user search, and controlled unenrolment operations. The SuperTools repository is private, so its source link is intentionally not exposed on this portfolio.",
    featured: true,
    status: "Internal production-oriented project"
  },
  {
    slug: "unifair",
    index: "02",
    title: "UniFair",
    eyebrow: "Moodle Plugin · Workflow Design",
    subtitle: "Custom Moodle activity for university fair scheduling and student selection",
    summary: "A custom Moodle activity where students choose universities across multiple sessions while the system enforces availability, quotas, timing, and role-based administration.",
    problem: "A simple choice activity could not safely represent multiple sessions, one selection per session, university quotas, scheduling windows, imports, and operational reporting.",
    solution: "I developed a dedicated Moodle activity module with its own sessions, university records, selection logic, quota enforcement, administrative screens, imports, reports, and role capabilities.",
    role: ["Requirement analysis", "Moodle activity design", "PHP / database development", "Permission design", "Iterative debugging"],
    features: ["Multi-session event model", "One university selection per session", "Per-university quota enforcement", "Selection and session time windows", "CSV import and bulk management", "Sorting and reporting", "School-manager capabilities", "Data-preserving Moodle upgrades"],
    stack: ["Moodle 4.x", "PHP", "MySQL", "Moodle Forms API", "Capabilities", "CSV"],
    outcome: "UniFair shows how a real school process can be translated into a purpose-built LMS workflow with constraints, permissions, migration considerations, and continuous user feedback.",
    repoUrl: "https://github.com/eltonmalumbot/unifairplugin",
    status: "Custom Moodle module"
  },
  {
    slug: "moodle-service-portal",
    index: "03",
    title: "Moodle Service Portal",
    eyebrow: "LMS Service Operations",
    subtitle: "Centralized service-management portal for LMS data requests",
    summary: "A role-based portal that replaces fragmented request handling with trackable tickets, school-scoped access, status history, administration, reporting, and deployment safeguards.",
    problem: "The operational flow lacked one place to submit, assign, track, audit, and report LMS requests while preserving school-level data boundaries.",
    solution: "I built a PHP/MySQL portal with role-based access, automatic ticket numbering, history, admin notes, scoped dashboards, security controls, and a path toward Moodle Web Services integration.",
    role: ["Process redesign", "Application architecture", "PHP / MySQL development", "Access-control design", "Hosting and deployment troubleshooting"],
    features: ["Admin and coordinator roles", "School-scoped data access", "Ticket lifecycle and history", "Dashboard and filters", "CSRF protection and password hashing", "Protected deployment workflow", "Bulk request and reporting roadmap", "Moodle API integration roadmap"],
    stack: ["PHP", "MySQL", "Docker", "GitHub Actions", "HTML/CSS", "Moodle Web Services"],
    outcome: "The portal demonstrates service workflow design around an LMS while keeping permissions, traceability, and deployment safety part of the product.",
    repoUrl: "https://github.com/eltonmalumbot/moodleserviceportal",
    repoPrivate: true,
    status: "Internal service platform"
  },
  {
    slug: "cariskolah",
    index: "04",
    title: "CariSekolah",
    eyebrow: "Education · Full-stack",
    subtitle: "School discovery and comparison platform",
    summary: "A modern education discovery product with filtering, maps, nearby recommendations, school profiles, comparisons, media management, and role-based publishing workflows.",
    problem: "School information is often fragmented and difficult to compare consistently across location, facilities, accreditation, fees, and other attributes.",
    solution: "I built a Next.js product backed by Supabase with discovery tools, structured profiles, publishing roles, audit logs, and image storage for a scalable school catalogue experience.",
    role: ["Product concept", "Full-stack implementation", "Data model", "Role design", "Deployment"],
    features: ["School filtering and search", "Map and nearby discovery", "School profile and comparison", "Admin and Editor workflow", "Draft / Published / Archived states", "Supabase database and storage", "Photo management", "Audit logging"],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    outcome: "CariSekolah demonstrates product-oriented full-stack development outside Moodle while staying connected to the education domain.",
    liveUrl: "https://cariskolah.vercel.app",
    repoUrl: "https://github.com/eltonmalumbot/cariskolah",
    repoPrivate: true,
    status: "Live demo"
  },
  {
    slug: "pindailoker",
    index: "05",
    title: "PindaiLoker",
    eyebrow: "Career Tech · Product Prototype",
    subtitle: "Job discovery, resume analysis, and application tracking",
    summary: "A career-tech concept that brings job discovery, resume-to-role analysis, improvement suggestions, and application tracking into one workflow.",
    problem: "Job seekers frequently switch between job boards, documents, AI tools, and spreadsheets to manage one application journey.",
    solution: "I created a Next.js foundation for collecting roles, comparing resumes to job descriptions, generating improvement suggestions, and tracking applications through a Kanban-style workflow.",
    role: ["Product concept", "Frontend", "Application architecture", "Supabase foundation", "Deployment"],
    features: ["Job intake by link, text, or form", "Resume-to-job analysis workflow", "AI-assisted resume improvement concept", "Kanban application tracking", "Private resume storage foundation", "Privacy-aware data design"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "AI-assisted workflows"],
    outcome: "PindaiLoker is presented as a product prototype, showing experimentation with career workflows, privacy-aware document handling, and AI-assisted product design.",
    liveUrl: "https://pindailoker.vercel.app",
    repoUrl: "https://github.com/eltonmalumbot/pindailoker",
    status: "Prototype / live demo"
  },
  {
    slug: "prankjessica",
    index: "06",
    title: "Prank Jessica",
    eyebrow: "Playful Side Project · Interactive Web",
    subtitle: "Pixel-style interactive date invitation and mini-game experience",
    summary: "A playful side project that turns a simple date invitation into an interactive pink pixel-style experience with playful UI behavior, eight mini-games, date planning, and a final personalized ticket.",
    problem: "A normal message or static invitation would be forgettable. The idea was to make a small personal interaction feel surprising, playful, and memorable through the browser.",
    solution: "I built a multi-step Next.js experience with a dodging No button, an eight-stage Love Quest, date and activity selection, and a final date ticket and note—all wrapped in a cohesive pixel-inspired visual system.",
    role: ["Concept and interaction design", "Frontend development", "Game logic", "Responsive UI", "Vercel deployment"],
    features: ["Dodging No-button interaction", "Eight mini-game Love Quest", "Catch Hearts and Love Maze", "Memory Match and Find My Heart", "Flappy Heart and Love Quiz", "Scratch Card and Date Wheel", "Date and activity selection", "Final personalized date ticket and note"],
    stack: ["Next.js 16", "React 19", "JavaScript", "CSS", "Vercel"],
    outcome: "Prank Jessica is intentionally presented as a playful side project. It shows experimentation with micro-interactions, stateful UI, lightweight game mechanics, responsive design, and turning a personal idea into a polished live web experience.",
    liveUrl: "https://prankjessica.vercel.app/",
    repoUrl: "https://github.com/eltonmalumbot/prankjessica",
    status: "Playful side project / live demo"
  },
  {
    slug: "moodle-teacher-training",
    index: "07",
    title: "Moodle & Teacher Digital Training",
    eyebrow: "Educator Training · Moodle · Educational Technology",
    subtitle: "Hands-on Moodle and digital technology training for teachers",
    summary: "I facilitate practical training for teachers, with Moodle as a core topic alongside other educational technology and digital-workflow sessions. The focus is not only explaining features, but helping educators become comfortable applying technology in their day-to-day work.",
    problem: "Teachers can have very different levels of digital confidence. Effective training needs to translate technical tools into clear, practical steps that are relevant to classroom and school workflows.",
    solution: "I deliver guided, hands-on sessions using demonstrations, step-by-step practice, discussion, troubleshooting, and direct assistance. Moodle is one of the main training areas, while other sessions can cover broader digital tools and technology used by educators.",
    role: ["Moodle trainer", "Teacher technology facilitator", "Workshop facilitation", "Training material preparation", "Hands-on mentoring and troubleshooting"],
    features: ["Hands-on Moodle training for teachers", "Guided demonstrations and practical exercises", "Teacher-focused educational technology sessions", "Live Q&A and troubleshooting", "Step-by-step learning support", "Training materials and session documentation", "Adaptation to different levels of digital readiness", "Photo documentation gallery for training activities"],
    stack: ["Moodle", "Educational Technology", "Teacher Training", "Workshop Facilitation", "Digital Literacy"],
    outcome: "This work demonstrates my ability to bridge technical LMS knowledge and real educator needs—communicating clearly, facilitating hands-on learning, and supporting teachers as they adopt digital tools.",
    status: "Educator training & facilitation"
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

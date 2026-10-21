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
  coverImageUrl?: string;
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
  },
  {
    slug: "elton-office",
    index: "08",
    title: "Elton Office — AI Agent OS",
    eyebrow: "AI Engineering · Agent Orchestration",
    subtitle: "Private virtual office for AI-assisted GitHub engineering",
    summary: "A private AI engineering workspace that coordinates planning, code generation, review, and guarded GitHub delivery through a Next.js dashboard, Neon-backed task history, and a trusted local worker.",
    problem: "Coordinating AI-assisted development across repositories can fragment planning, code review, approval, and delivery history. Automation also needs clear permission boundaries so AI suggestions do not become uncontrolled changes.",
    solution: "I built an owner-authenticated virtual office that combines GitHub repository workspaces, orchestrated AI roles, the Orion supervisor, CI-gated pull request workflows, and a local worker integrated with Hermes and 9Router. Neon stores task state and audit events, while sensitive actions are protected by explicit policy and owner approval.",
    role: [
      "Product concept and architecture",
      "Agent workflow and orchestration",
      "Next.js dashboard and local Node.js worker",
      "GitHub, Neon, and CI/CD integration",
      "Security gates and approval workflows"
    ],
    features: [
      "Agent workflow for Project Manager, Developer, Reviewer, and DevOps responsibilities",
      "Private GitHub OAuth dashboard with repository-scoped task and activity views",
      "Orion Supervisor for approved tasks and sequential multi-repository roadmaps",
      "AI coding integration via local Hermes and 9Router, with configurable model backends",
      "GitHub pull request generation with review and repository-specific CI safeguards",
      "Opt-in automatic merging only when repository policy and CI checks permit it",
      "Owner-approved Neon project, branch, and database provisioning (S4 opt-in)",
      "Isometric virtual office view with agent status and task monitoring"
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Neon PostgreSQL",
      "GitHub OAuth & API",
      "GitHub Actions",
      "Hermes & 9Router",
      "Vercel"
    ],
    outcome: "An evolving personal AI engineering control center that makes automated development more observable and auditable while retaining repository-scoped permissions and owner-controlled safeguards. This is an active private project, not a publicly available autonomous development service.",
    coverImageUrl: "/projects/elton-office/cover.avif",
    repoUrl: "https://github.com/eltonmalumbot/ai-virtual-office",
    repoPrivate: true,
    status: "Active development · Private repository"
  },
  {
    slug: "commuterline-ai",
    index: "09",
    title: "CommuterLine AI — Jabodetabek",
    eyebrow: "Transport Technology · Schedule Data",
    subtitle: "Five-line commuter rail timetable and route-planning website",
    summary: "A browser-based Jabodetabek KRL schedule explorer covering five rail lines, timetable-based arrivals, transfer search, route favorites, and a map simulation built from public timetable and geographic datasets.",
    problem: "Public train timetables are difficult to filter for specific station pairs, connecting services, and arrival times. Riders need a practical way to explore scheduled journeys without confusing timetables with live train positions.",
    solution: "I built a responsive React and TypeScript web application that imports the September 10, 2026 KAI Commuter public timetable, searches services throughout the day, suggests connections with bounded transfer rules, stores browser-local favorite routes, and visualizes scheduled train movement on a geographic network map. The interface explicitly distinguishes schedule simulation from operational real-time tracking.",
    role: [
      "Product and transport data workflow design",
      "React/TypeScript implementation",
      "Timetable PDF parsing and import validation",
      "Route search and transfer algorithm",
      "Mapping, browser storage, and deployment design"
    ],
    features: [
      "Five Jabodetabek lines: Cikarang (Blue), Bogor/Nambo (Red), Tangerang (Brown), Rangkasbitung (Green), and Tanjung Priok (Pink)",
      "Station-pair search with scheduled arrival, duration, service number, and destination information",
      "Transfer alternatives of up to two changes, with minimum 6-minute connection and bounded waiting time",
      "Cilejit–Tanah Abang commute presets and browser-local route favorites",
      "Schedule-driven 2D rail map with approximate movement, not live GPS tracking",
      "Data import validation: 1,138 identifiable journeys from the September 10, 2026 public timetable",
      "Clearly labeled schedule source and links to official operational announcements; no automatic delay feed"
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "OpenStreetMap",
      "Leaflet",
      "Schedule Parsing",
      "Browser Storage",
      "Vercel"
    ],
    outcome: "A functional timetable-based route explorer and map simulation that makes published KRL information easier to explore. It does not offer verified live train locations, delay predictions, or guaranteed connections.",
    coverImageUrl: "/projects/commuterline-ai/cover.svg",
    repoUrl: "https://github.com/eltonmalumbot/commuterline-ai-jabodetabek",
    repoPrivate: true,
    status: "Schedule-data web prototype · Private repository"
  },
  {
    slug: "telaah",
    index: "10",
    title: "Telaah — Educational Analysis & Certificates",
    eyebrow: "Educational Technology · Text Analytics",
    subtitle: "Indonesian reflection review, duplicate matching, and certificate tools",
    summary: "A Next.js application for examining Indonesian-language reflection responses, comparing duplicate or similar entries, supporting reviewer-controlled rubric assessments, importing student spreadsheets, exporting reports, and generating certificates.",
    problem: "Reviewing large sets of learner reflections can require repetitive sorting, checking for repeated responses, applying a consistent rubric, preparing reports, and issuing certificates. Fully automated grades would risk concealing the limits of simple language heuristics.",
    solution: "I built an analysis workspace that accepts text or spreadsheet responses, highlights explainable pattern findings, compares pairs of answers, supports reviewer edits and confirmation of a four-aspect rubric, and exports filtered PDF/CSV reports. A separate certificate studio produces customizable documents with optional locally verifiable signed QR information.",
    role: [
      "Product and analysis workflow design",
      "Next.js and TypeScript engineering",
      "Spreadsheet import and export validation",
      "Human-in-the-loop assessment UX",
      "PDF, certificates, and verification workflow"
    ],
    features: [
      "Analyze pasted Indonesian text or import XLSX/CSV responses with field mapping",
      "Exact and normalized duplicate comparison with participant filters, ranking, and side-by-side review",
      "Four-part reflection quality rubric: relevance, reflection depth, concrete examples, and action plan",
      "Editable reviewer corrections, confirmation status, and filter-aware top-candidate lists",
      "Browser-local IndexedDB project persistence and PDF/CSV reporting",
      "Certificate studio with customizable templates, bulk PDF/ZIP output, and optional ECDSA-signed QR verification",
      "Clearly disclosed rule-based heuristic suggestions; no AI authorship detection or fully reliable automated grading claim"
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Spreadsheet Import",
      "IndexedDB",
      "PDF/CSV Export",
      "ECDSA QR Verification",
      "Vercel"
    ],
    outcome: "An education-focused review and document-generation tool combining inspectable rule-based analysis with human judgment. Candidate scores remain suggestions, not validated automated final grades.",
    coverImageUrl: "/projects/telaah/cover.svg",
    repoUrl: "https://github.com/eltonmalumbot/telaah.",
    status: "Educational analysis application · Public repository"
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

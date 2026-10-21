import { neon } from "@neondatabase/serverless";
import { projects as fallbackProjects, type Project } from "../data/projects";

export type PortfolioProfile = {
  name: string;
  headline: string;
  bio: string;
  photoUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  organizationName?: string;
  educationName?: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
};

const fallbackProfile: PortfolioProfile = {
  name: "Elton Malumbot",
  headline: "DevOps Engineer | AI & Web Engineering | LMS Administrator",
  bio: "DevOps Engineer with hands-on experience across Moodle LMS operations, full-stack web development, AI-assisted workflows, Vercel deployment, Supabase, Neon PostgreSQL, Docker, Linux, and CI/CD tooling.",
  photoUrl: "/elton-profile.jpg",
  linkedinUrl: "https://www.linkedin.com/in/eltonmalumbot/",
  githubUrl: "https://github.com/eltonmalumbot",
  location: "Jakarta, Indonesia",
  jobTitle: "DevOps Engineer",
  organizationName: "BPK PENABUR Jakarta",
  educationName: "STMIK Dharma Putra",
};

const fallbackCertificates: Certificate[] = [
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", description: "Certificate details will be added from the portfolio admin data." },
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", description: "This section is ready for LMS, IT, cloud, data, development, and operations credentials." },
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", description: "Credential links and certificate images can be stored through the portfolio backend." },
];

const fallbackProjectImages: Record<string, string[]> = {
  "commuterline-ai": ["/projects/commuterline-ai/cover.svg"],
  telaah: ["/projects/telaah/cover.svg"],
  "elton-office": [
    "/projects/elton-office/cover.avif",
    "/projects/elton-office/task-board.avif",
    "/projects/elton-office/activity-log.avif",
    "/projects/elton-office/orion-supervisor.avif",
  ],
  supertools: [
    "/projects/supertools/cover.webp",
    "/projects/supertools/bulk-users.webp",
  ],
  unifair: [
    "/projects/unifair/cover.webp",
    "/projects/unifair/student-view.webp",
  ],
  "moodle-service-portal": [
    "/projects/moodle-service-portal/cover.webp",
    "/projects/moodle-service-portal/users.webp",
    "/projects/moodle-service-portal/stats.webp",
  ],
};

function db() {
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

function mapProject(row: any): Project {
  return {
    slug: row.slug,
    index: String(row.sort_order ?? 0).padStart(2, "0"),
    title: row.title,
    eyebrow: row.eyebrow,
    subtitle: row.subtitle,
    summary: row.summary,
    problem: row.problem,
    solution: row.solution,
    role: Array.isArray(row.role_items) ? row.role_items : [],
    features: Array.isArray(row.feature_items) ? row.feature_items : [],
    stack: Array.isArray(row.stack_items) ? row.stack_items : [],
    outcome: row.outcome,
    featured: row.featured,
    // Keep the private Elton Office dashboard out of public live previews.
    liveUrl: row.slug === "elton-office" ? undefined : (row.live_url || undefined),
    repoUrl: row.repo_url || undefined,
    repoPrivate: row.repo_private,
    pluginNote: row.plugin_note || undefined,
    coverImageUrl: row.slug === "elton-office"
      ? "/projects/elton-office/cover.avif"
      : (row.resolved_cover_image_url || row.cover_image_url ||
          (row.slug === "commuterline-ai" ? "/projects/commuterline-ai/cover.svg" :
           row.slug === "telaah" ? "/projects/telaah/cover.svg" : undefined)),
    status: row.status,
  };
}

export async function getPortfolioHomeData() {
  const sql = db();
  if (!sql) return { profile: fallbackProfile, projects: fallbackProjects, certificates: fallbackCertificates };

  try {
    const [profileRows, projectRows, certificateRows, codeBackedProjectRows] = await Promise.all([
      sql`SELECT * FROM portfolio_profile ORDER BY updated_at DESC LIMIT 1`,
      sql`
        SELECT p.*,
          COALESCE(
            p.cover_image_url,
            (
              SELECT i.image_url
              FROM portfolio_project_images i
              WHERE i.project_id = p.id
              ORDER BY i.sort_order ASC, i.created_at ASC
              LIMIT 1
            )
          ) AS resolved_cover_image_url
        FROM portfolio_projects p
        WHERE p.published = true
        ORDER BY p.sort_order ASC
      `,
      sql`SELECT * FROM portfolio_certificates WHERE published = true ORDER BY sort_order ASC`,
      // If the project is not registered in Neon, show the version in Git.
      // A Neon row (including an unpublished row) takes precedence.
      sql`SELECT slug FROM portfolio_projects WHERE slug IN ('elton-office', 'commuterline-ai', 'telaah')`,
    ]);

    const p = (profileRows as any[])[0];
    const profile: PortfolioProfile = p ? {
      name: p.name,
      headline: p.headline,
      bio: p.bio,
      photoUrl: p.photo_url || fallbackProfile.photoUrl,
      linkedinUrl: p.linkedin_url || undefined,
      githubUrl: p.github_url || undefined,
      email: p.email || undefined,
      phone: p.phone || undefined,
      location: p.location || undefined,
      jobTitle: p.job_title || undefined,
      organizationName: p.organization_name || undefined,
      educationName: p.education_name || undefined,
    } : fallbackProfile;

    const dbProjects = (projectRows as any[]).map(mapProject);
    const certificates = (certificateRows as any[]).map((c) => ({
      title: c.title,
      issuer: c.issuer,
      year: c.year_label || undefined,
      credentialUrl: c.credential_url || undefined,
      imageUrl: c.image_url || undefined,
      description: c.description || undefined,
    }));

    const codeBackedSlugs = new Set(["elton-office", "commuterline-ai", "telaah"]);
    const registeredSlugs = new Set((codeBackedProjectRows as any[]).map((row) => String(row.slug)));
    const baseProjects = dbProjects.length
      ? dbProjects
      : fallbackProjects.filter((project) => !codeBackedSlugs.has(project.slug));
    // A row in Neon takes precedence, including unpublished rows; never re-publish it from fallback data.
    const additionalProjects = fallbackProjects
      .filter((project) => codeBackedSlugs.has(project.slug) && !registeredSlugs.has(project.slug))
      .map((project, index) => ({ ...project, index: String(baseProjects.length + index + 1).padStart(2, "0") }));
    const projects = [...baseProjects, ...additionalProjects];

    return {
      profile,
      projects,
      certificates: certificates.length ? certificates : fallbackCertificates,
    };
  } catch (error) {
    console.error("Portfolio database fallback:", error);
    return { profile: fallbackProfile, projects: fallbackProjects, certificates: fallbackCertificates };
  }
}

export async function getPortfolioProject(slug: string) {
  const sql = db();
  if (!sql) return fallbackProjects.find((p) => p.slug === slug);
  try {
    const rows = await sql`
      SELECT p.*,
        COALESCE(
          p.cover_image_url,
          (
            SELECT i.image_url
            FROM portfolio_project_images i
            WHERE i.project_id = p.id
            ORDER BY i.sort_order ASC, i.created_at ASC
            LIMIT 1
          )
        ) AS resolved_cover_image_url
      FROM portfolio_projects p
      WHERE p.slug = ${slug}
      LIMIT 1
    `;
    const row = (rows as any[])[0];
    // An unpublished Neon project must never be resurrected by a local fallback.
    return row ? (row.published ? mapProject(row) : undefined) : fallbackProjects.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Portfolio project fallback:", error);
    return fallbackProjects.find((p) => p.slug === slug);
  }
}

export async function getProjectImages(slug: string) {
  const fallback = fallbackProjectImages[slug] ?? [];
  const sql = db();
  if (!sql) return fallback;
  try {
    const rows = await sql`
      SELECT i.image_url
      FROM portfolio_project_images i
      JOIN portfolio_projects p ON p.id = i.project_id
      WHERE p.slug = ${slug}
      ORDER BY i.sort_order ASC
    `;
    const images = (rows as any[])
      .map((r) => r.image_url)
      .filter(Boolean)
      // Suppress the unrelated Moodle upload that was accidentally attached to Elton Office.
      .filter((url) => slug !== "elton-office" || url !== "/projects/elton-office/moodle-install-error.avif");
    // Keep both source screenshots visible even when Neon holds additional gallery items.
    return slug === "elton-office"
      ? [...fallback, ...images.filter((url) => !fallback.includes(url))]
      : (images.length ? images : fallback);
  } catch {
    return fallback;
  }
}

import Arrow from "./arrow";
import Link from "next/link";
import { getPortfolioHomeData } from "../lib/portfolio";
import ProjectCatalog from "./project-catalog";
import ThemeToggle from "./theme-toggle";
import ProjectMedia from "./project-media";

export const dynamic = "force-dynamic";

const skills = [
  "DevOps & Linux",
  "Docker & CI/CD",
  "Prometheus & Grafana",
  "AI-assisted Web Engineering",
  "Next.js & TypeScript",
  "Vercel Deployment",
  "Supabase & PostgreSQL",
  "Neon PostgreSQL & Auth",
  "Moodle Administration",
  "LMS Automation",
  "Moodle Web Services",
  "Data & Reporting",
];

export default async function Home() {
  const {
    profile,
    projects,
    certificates,
    dataUnavailable = false,
  } = await getPortfolioHomeData();
  const phoneHref = profile.phone
    ? `tel:${profile.phone.replace(/[^+\d]/g, "")}`
    : undefined;

  const recentProjects = ["project-handoff-hub", "peoplelens"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="header shell">
        <Link prefetch={false} href="/" className="brand">
          <span>em.</span> {profile.name}
        </Link>
        <div className="header-actions">
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#certificates">Credentials</a>
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            DevOps · Full-stack development · LMS &amp; automation
          </p>
          <h1 id="hero-title">
            DevOps engineer.
            <br />
            <em>Full-stack builder.</em>
          </h1>
          <p className="lead">
            I’m {profile.name}. I build web products, operate infrastructure,
            and connect Moodle platforms with the people and workflows behind
            them.
          </p>
          <div className="actions">
            <a className="btn primary" href="#work">
              View my work <Arrow down />
            </a>
            <a
              className="link"
              href={profile.githubUrl ?? "https://github.com/eltonmalumbot"}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <Arrow />
            </a>
          </div>
          <div className="hero-index">
            <span>{profile.location ?? "Jakarta, Indonesia"}</span>
            <span>{projects.length} documented projects</span>
          </div>
        </div>
        <aside className="hero-side" aria-label="Professional profile">
          <div className="photo-card">
            <img
              src={profile.photoUrl ?? "/elton-profile.jpg"}
              alt={profile.name}
              className="profile-photo"
              width="400"
              height="480"
              fetchPriority="high"
            />
          </div>
          <p className="profile-role">
            {profile.jobTitle ?? "DevOps Engineer"}
            <span>{profile.organizationName ?? "BPK PENABUR Jakarta"}</span>
          </p>
          <p className="profile-note">
            Infrastructure operations. Full-stack products. Practical
            automation.
          </p>
        </aside>
      </section>

      {recentProjects.length > 0 && (
        <section
          className="section shell recent-work"
          aria-labelledby="recent-title"
        >
          <div className="section-head">
            <div>
              <p className="eyebrow">01 / In focus</p>
              <h2 id="recent-title">Recent engineering work.</h2>
            </div>
            <p className="muted note">
              Two studies in workflow engineering: developer continuity and
              accountable HR operations.
            </p>
          </div>
          <div className="recent-grid">
            {recentProjects.map((project) => (
              <article className="recent-project" key={project.slug}>
                <ProjectMedia project={project} featured />
                <div className="recent-copy">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>
                    <Link prefetch={false} href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p>{project.subtitle}</p>
                  <p className="project-status">{project.status}</p>
                  <Link
                    prefetch={false}
                    className="link"
                    href={`/work/${project.slug}`}
                  >
                    Read case study <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="work" className="section shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 / Project index</p>
            <h2>The work, in detail.</h2>
          </div>
          <p className="muted note">
            My work spans DevOps and platform operations, full-stack products,
            AI-assisted workflows, Moodle/LMS systems, and practical automation.
          </p>
        </div>
        {dataUnavailable ? (
          <p className="content-unavailable" role="status">
            Project and credential data is temporarily unavailable. Please try
            again shortly.
          </p>
        ) : (
          <ProjectCatalog projects={projects} />
        )}
      </section>

      <section className="dark">
        <div className="section shell two">
          <div>
            <p className="eyebrow pale">03 / Capabilities</p>
            <h2>From infrastructure to interface.</h2>
            <p>
              I work across infrastructure, deployment, databases, web
              applications, AI-assisted workflows, and LMS operations—then
              connect those skills to real user and organizational needs.
            </p>
          </div>
          <div className="skills">
            {skills.map((s, i) => (
              <div key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{s}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section shell two">
        <div>
          <p className="eyebrow">04 / About</p>
          <h2>I like building systems that remove friction from work.</h2>
        </div>
        <div>
          <p className="about-lead">
            I’m currently a {profile.jobTitle ?? "DevOps Engineer"} at{" "}
            {profile.organizationName ?? "BPK PENABUR Jakarta"}. My background
            combines Moodle/LMS operations with DevOps practices and modern
            full-stack web development.
          </p>
          <p className="muted copy">
            I build practical products and internal tools using technologies
            such as Next.js, TypeScript, Vercel, Supabase, Neon PostgreSQL,
            Docker, Linux, CI/CD tooling, and Moodle Web Services. I also
            explore AI-assisted workflows where they can make a product more
            useful—not just add an AI label.
          </p>
          <div className="facts">
            <div>
              <span>Current role</span>
              <b>{profile.jobTitle ?? "DevOps Engineer"}</b>
            </div>
            <div>
              <span>Core focus</span>
              <b>DevOps · Web · LMS</b>
            </div>
            <div>
              <span>Cloud data</span>
              <b>Supabase · Neon PostgreSQL</b>
            </div>
            <div>
              <span>Based in</span>
              <b>{profile.location ?? "Jakarta, Indonesia"}</b>
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" className="section cert-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">05 / Credentials</p>
              <h2>Learning, put into practice.</h2>
            </div>
            <p className="muted note">
              Selected credentials that support my technical, data, LMS,
              communication, and systems background.
            </p>
          </div>
          <div className="cert-grid">
            {certificates.map((cert, i) => (
              <article className="cert-card" key={`${cert.title}-${i}`}>
                {cert.imageUrl && (
                  <a
                    className="cert-image-link"
                    href={cert.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${cert.title} ${cert.imageUrl?.includes("ccep-2026-summary.svg") ? "credential summary graphic" : "certificate image"}`}
                  >
                    <img
                      className="cert-image"
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="400"
                      src={cert.imageUrl}
                      alt={`${cert.title} ${cert.imageUrl?.includes("ccep-2026-summary.svg") ? "credential summary graphic, not the original issued certificate" : "certificate"}`}
                    />
                  </a>
                )}
                <div className="cert-body">
                  <span className="cert-badge">CERTIFICATE</span>
                  <h3>{cert.title}</h3>
                  <p className="cert-meta">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ""}
                  </p>
                  {cert.description && (
                    <p className="muted copy">{cert.description}</p>
                  )}
                </div>
                <div className="cert-actions">
                  {cert.credentialUrl ? (
                    <a
                      className="link"
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View credential <Arrow />
                    </a>
                  ) : cert.imageUrl ? (
                    <a
                      className="link"
                      href={cert.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View certificate <Arrow />
                    </a>
                  ) : (
                    <span className="muted">Credential details pending</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="shell">
          <p className="eyebrow pale">06 / Contact</p>
          <h2>Let’s talk systems, products, and better workflows.</h2>
          <p>
            Explore my code on GitHub, connect with me on LinkedIn, or reach me
            directly.
          </p>
          <div className="actions">
            <a
              className="btn light"
              href={profile.githubUrl ?? "https://github.com/eltonmalumbot"}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a
              className="btn outline"
              href={
                profile.linkedinUrl ??
                "https://www.linkedin.com/in/eltonmalumbot/"
              }
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
            {profile.email && (
              <a className="btn outline" href={`mailto:${profile.email}`}>
                Email <Arrow />
              </a>
            )}
            {profile.phone && phoneHref && (
              <a className="btn outline" href={phoneHref}>
                Call {profile.phone}
              </a>
            )}
          </div>
        </div>
      </section>
      <footer className="footer shell">
        <span>© 2026 {profile.name}</span>
        <span>Built with Next.js · Neon Postgres · Vercel</span>
      </footer>
    </main>
  );
}

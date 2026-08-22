import Link from "next/link";
import { getPortfolioHomeData } from "../lib/portfolio";
import ProjectMedia from "./project-media";
import ThemeToggle from "./theme-toggle";
import CinematicParallax from "./cinematic-parallax";

export const dynamic = "force-dynamic";

const skills = [
  "DevOps & Linux","Docker & CI/CD","Prometheus & Grafana","AI-assisted Web Engineering",
  "Next.js & TypeScript","Vercel Deployment","Supabase & PostgreSQL","Neon PostgreSQL & Auth",
  "Moodle Administration","LMS Automation","Moodle Web Services","Data & Reporting",
];

export default async function Home() {
  const { profile, projects, certificates } = await getPortfolioHomeData();
  const phoneHref = profile.phone ? `tel:${profile.phone.replace(/[^+\d]/g, "")}` : undefined;

  return (
    <main>
      <CinematicParallax>
        <div className="cinematic-scene" aria-hidden="true">
          <div className="cinematic-sky-glow" />
          <div className="cinematic-orbit" />
          <div className="cinematic-stars" />
          <div className="cinematic-cloud c1" />
          <div className="cinematic-cloud c2" />
          <div className="cinematic-cloud c3" />
          <div className="cinematic-mountain back" />
          <div className="cinematic-mountain" />
          <div className="cinematic-grid" />
          <div className="cinematic-noise" />
        </div>

        <header className="header shell cinematic-header">
          <Link href="/" className="brand"><span>EM</span> {profile.name}</Link>
          <div className="header-actions">
            <nav><a href="#work">Work</a><a href="#about">About</a><a href="#certificates">Certificates</a><a href="#contact">Contact</a></nav>
            <ThemeToggle />
          </div>
        </header>

        <section className="hero shell cinematic-hero">
          <div className="cinematic-copy">
            <p className="eyebrow">DEVOPS · AI-ASSISTED WEB ENGINEERING · LMS & SYSTEMS</p>
            <h1>I build and operate systems—from production LMS platforms to modern web applications.</h1>
            <p className="lead">I’m {profile.name}, a {profile.jobTitle ?? "DevOps Engineer"} working across infrastructure operations, Moodle LMS, full-stack web development, AI-assisted product workflows, and cloud deployment with Vercel, Supabase, and Neon PostgreSQL.</p>
            <div className="actions"><a className="btn primary" href="#work">Explore my work ↘</a><a className="btn" href={profile.githubUrl ?? "https://github.com/eltonmalumbot"} target="_blank" rel="noreferrer">GitHub ↗</a><a className="btn" href={profile.linkedinUrl ?? "https://www.linkedin.com/in/eltonmalumbot/"} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          </div>
          <div className="hero-side">
            <div className="photo-card"><img src={profile.photoUrl ?? "/elton-profile.jpg"} alt={profile.name} className="profile-photo" /></div>
            <aside className="hero-card"><p className="muted tiny">CURRENT FOCUS</p><h2>DevOps operations with a product-builder mindset.</h2><p className="muted">I combine production support, automation, full-stack engineering, cloud databases, deployment, and LMS expertise to turn operational problems into usable systems.</p><div className="stats"><div><b>{projects.length}</b><span>Case studies</span></div><div><b>CI/CD</b><span>Delivery workflows</span></div><div><b>Cloud</b><span>Vercel · Supabase · Neon</span></div><div><b>LMS</b><span>Moodle systems</span></div></div></aside>
          </div>
        </section>
        <a href="#work" className="cinematic-scroll" aria-label="Scroll to selected work"><span>SCROLL TO WORK</span><i /></a>
      </CinematicParallax>

      <section id="work" className="section shell">
        <div className="section-head"><div><p className="eyebrow">SELECTED WORK</p><h2>Products and systems built around real operational problems.</h2></div><p className="muted note">My work spans DevOps and platform operations, full-stack products, AI-assisted workflows, Moodle/LMS systems, and practical automation.</p></div>
        <div className="grid">{projects.map((p)=><article className="card" key={p.slug}><ProjectMedia project={p} /><div className="card-meta"><span>{p.index}</span><span>{p.featured ? `Featured · ${p.status}` : p.status}</span></div><p className="eyebrow small">{p.eyebrow}</p><h3>{p.title}</h3><p className="subtitle">{p.subtitle}</p><p className="muted copy">{p.summary}</p><div className="tags">{p.stack.slice(0,4).map((t)=><span key={t}>{t}</span>)}</div><div className="card-actions"><Link className="link" href={`/work/${p.slug}`}>Case study ↗</Link>{p.repoUrl && <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">GitHub{p.repoPrivate ? " 🔒" : ""} ↗</a>}{p.liveUrl && <a className="muted" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}</div></article>)}</div>
      </section>

      <section className="dark"><div className="section shell two"><div><p className="eyebrow pale">WHAT I BRING</p><h2>Operations, development, and product thinking in one profile.</h2><p>I work across infrastructure, deployment, databases, web applications, AI-assisted workflows, and LMS operations—then connect those skills to real user and organizational needs.</p></div><div className="skills">{skills.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,"0")}</span><b>{s}</b></div>)}</div></div></section>

      <section id="about" className="section shell two"><div><p className="eyebrow">ABOUT</p><h2>I like building systems that remove friction from work.</h2></div><div><p className="about-lead">I’m currently a {profile.jobTitle ?? "DevOps Engineer"} at {profile.organizationName ?? "BPK PENABUR Jakarta"}. My background combines Moodle/LMS operations with DevOps practices and modern full-stack web development.</p><p className="muted copy">I build practical products and internal tools using technologies such as Next.js, TypeScript, Vercel, Supabase, Neon PostgreSQL, Docker, Linux, CI/CD tooling, and Moodle Web Services. I also explore AI-assisted workflows where they can make a product more useful—not just add an AI label.</p><div className="facts"><div><span>Current role</span><b>{profile.jobTitle ?? "DevOps Engineer"}</b></div><div><span>Core focus</span><b>DevOps · Web · LMS</b></div><div><span>Cloud data</span><b>Supabase · Neon PostgreSQL</b></div><div><span>Based in</span><b>{profile.location ?? "Jakarta, Indonesia"}</b></div></div></div></section>

      <section id="certificates" className="section cert-section"><div className="shell"><div className="section-head"><div><p className="eyebrow">CERTIFICATES</p><h2>Professional learning and certifications.</h2></div><p className="muted note">Selected credentials that support my technical, data, LMS, communication, and systems background.</p></div><div className="cert-grid">{certificates.map((cert,i)=><article className="cert-card" key={`${cert.title}-${i}`}>{cert.imageUrl && <a className="cert-image-link" href={cert.imageUrl} target="_blank" rel="noreferrer" aria-label={`Open ${cert.title} certificate image`}><img className="cert-image" src={cert.imageUrl} alt={`${cert.title} certificate`} /></a>}<div className="cert-body"><span className="cert-badge">CERTIFICATE</span><h3>{cert.title}</h3><p className="cert-meta">{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</p>{cert.description && <p className="muted copy">{cert.description}</p>}</div><div className="cert-actions">{cert.credentialUrl ? <a className="link" href={cert.credentialUrl} target="_blank" rel="noreferrer">View credential ↗</a> : cert.imageUrl ? <a className="link" href={cert.imageUrl} target="_blank" rel="noreferrer">View certificate ↗</a> : <span className="muted">Credential details pending</span>}</div></article>)}</div></div></section>

      <section id="contact" className="contact"><div className="shell"><p className="eyebrow pale">LET’S CONNECT</p><h2>Interested in DevOps, modern web products, AI-assisted workflows, or LMS systems?</h2><p>Explore my code on GitHub, connect with me on LinkedIn, or reach me directly.</p><div className="actions"><a className="btn light" href={profile.githubUrl ?? "https://github.com/eltonmalumbot"} target="_blank" rel="noreferrer">GitHub ↗</a><a className="btn outline" href={profile.linkedinUrl ?? "https://www.linkedin.com/in/eltonmalumbot/"} target="_blank" rel="noreferrer">LinkedIn ↗</a>{profile.email && <a className="btn outline" href={`mailto:${profile.email}`}>Email ↗</a>}{profile.phone && phoneHref && <a className="btn outline" href={phoneHref}>Call {profile.phone}</a>}</div></div></section>
      <footer className="footer shell"><span>© 2026 {profile.name}</span><span>Built with Next.js · Neon Postgres · Vercel</span></footer>
    </main>
  );
}

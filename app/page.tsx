import Link from "next/link";
import { getPortfolioHomeData } from "../lib/portfolio";
import ProjectMedia from "./project-media";
import ThemeToggle from "./theme-toggle";
import CinematicParallax from "./cinematic-parallax";

export const dynamic = "force-dynamic";

const skills = [
  "Moodle Administration","LMS Operations","Moodle Web Services","Workflow Automation",
  "PHP & MySQL","Data & Reporting","Next.js & TypeScript","GitHub & Deployment",
];

export default async function Home() {
  const { profile, projects, certificates } = await getPortfolioHomeData();
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured.slug);

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
            <p className="eyebrow">LMS · EDUCATIONAL TECHNOLOGY · SYSTEMS</p>
            <h1>I build systems that make learning technology easier to operate.</h1>
            <p className="lead">I’m {profile.name}, a {profile.jobTitle ?? "technology professional"} with hands-on experience designing, administering, and improving Moodle-based workflows, LMS operations, and internal digital tools.</p>
            <div className="actions"><a className="btn primary" href="#work">Explore my work ↘</a><a className="btn" href={profile.linkedinUrl ?? "https://www.linkedin.com/in/eltonmalumbot/"} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          </div>
          <div className="hero-side">
            <div className="photo-card"><img src="/elton-profile.jpg" alt={profile.name} className="profile-photo" /></div>
            <aside className="hero-card"><p className="muted tiny">CURRENT FOCUS</p><h2>LMS operations with a builder mindset.</h2><p className="muted">I work at the intersection of platform administration, workflow design, automation, troubleshooting, and web development.</p><div className="stats"><div><b>3</b><span>Core LMS projects</span></div><div><b>{projects.length}</b><span>Case studies</span></div><div><b>API</b><span>Moodle Web Services</span></div><div><b>Ops</b><span>Production workflows</span></div></div></aside>
          </div>
        </section>
        <a href="#work" className="cinematic-scroll" aria-label="Scroll to selected work"><span>SCROLL TO WORK</span><i /></a>
      </CinematicParallax>

      <section id="work" className="section shell">
        <div className="section-head"><div><p className="eyebrow">SELECTED WORK</p><h2>Systems built around real operational problems.</h2></div><p className="muted note">The first three projects focus directly on Moodle and LMS operations. Public products use their real live sites as previews; internal projects are labeled instead of using invented screenshots.</p></div>
        <article className="featured">
          <div><p className="tiny muted">{featured.index} / FEATURED</p><h3>{featured.title}</h3><p className="subtitle">{featured.subtitle}</p><p className="muted copy">{featured.summary}</p><div className="tags">{featured.stack.slice(0,5).map((t)=><span key={t}>{t}</span>)}</div><div className="card-actions"><Link className="link" href={`/work/${featured.slug}`}>Read case study ↗</Link>{featured.repoUrl ? <a className="link" href={featured.repoUrl} target="_blank" rel="noreferrer">GitHub{featured.repoPrivate ? " 🔒" : ""} ↗</a> : <span className="muted">Private source</span>}</div></div>
          <ProjectMedia project={featured} featured />
        </article>
        <div className="grid">{others.map((p)=><article className="card" key={p.slug}><ProjectMedia project={p} /><div className="card-meta"><span>{p.index}</span><span>{p.status}</span></div><p className="eyebrow small">{p.eyebrow}</p><h3>{p.title}</h3><p className="subtitle">{p.subtitle}</p><p className="muted copy">{p.summary}</p><div className="tags">{p.stack.slice(0,4).map((t)=><span key={t}>{t}</span>)}</div><div className="card-actions"><Link className="link" href={`/work/${p.slug}`}>Case study ↗</Link>{p.repoUrl && <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">GitHub{p.repoPrivate ? " 🔒" : ""} ↗</a>}{p.liveUrl && <a className="muted" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}</div></article>)}</div>
      </section>

      <section className="dark"><div className="section shell two"><div><p className="eyebrow pale">WHAT I BRING</p><h2>Not only administration. Not only development.</h2><p>I understand how people use an LMS, then translate that into safer workflows, automation, tools, and technical improvements.</p></div><div className="skills">{skills.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,"0")}</span><b>{s}</b></div>)}</div></div></section>

      <section id="about" className="section shell two"><div><p className="eyebrow">ABOUT</p><h2>Technology should remove friction from work.</h2></div><div><p className="about-lead">I’m currently a {profile.jobTitle ?? "DevOps Engineer"} at {profile.organizationName ?? "BPK PENABUR Jakarta"}. My portfolio has grown around Moodle, education technology, operational systems, and practical web products.</p><p className="muted copy">I enjoy turning repetitive or error-prone processes into tools people can actually use—whether that means a Moodle administration platform, a custom LMS activity, a service portal, or a full-stack education product.</p><div className="facts"><div><span>Current role</span><b>{profile.jobTitle ?? "DevOps Engineer"}</b></div><div><span>Organization</span><b>{profile.organizationName ?? "BPK PENABUR Jakarta"}</b></div><div><span>Education</span><b>{profile.educationName ?? "STMIK Dharma Putra"}</b></div><div><span>Based in</span><b>{profile.location ?? "Jakarta, Indonesia"}</b></div></div></div></section>

      <section id="certificates" className="section cert-section"><div className="shell"><div className="section-head"><div><p className="eyebrow">CERTIFICATES</p><h2>Professional learning and certifications.</h2></div><p className="muted note">Selected credentials that support my technical, data, LMS, and systems background.</p></div><div className="cert-grid">{certificates.map((cert,i)=><article className="cert-card" key={`${cert.title}-${i}`}>{cert.imageUrl && <a className="cert-image-link" href={cert.imageUrl} target="_blank" rel="noreferrer" aria-label={`Open ${cert.title} certificate image`}><img className="cert-image" src={cert.imageUrl} alt={`${cert.title} certificate`} /></a>}<div className="cert-body"><span className="cert-badge">CERTIFICATE</span><h3>{cert.title}</h3><p className="cert-meta">{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</p>{cert.description && <p className="muted copy">{cert.description}</p>}</div><div className="cert-actions">{cert.credentialUrl ? <a className="link" href={cert.credentialUrl} target="_blank" rel="noreferrer">View credential ↗</a> : cert.imageUrl ? <a className="link" href={cert.imageUrl} target="_blank" rel="noreferrer">View certificate ↗</a> : <span className="muted">Credential details pending</span>}</div></article>)}</div></div></section>

      <section id="contact" className="contact"><div className="shell"><p className="eyebrow pale">LET’S CONNECT</p><h2>Interested in LMS, EdTech, or systems that simplify operations?</h2><p>See my professional background on LinkedIn or browse my public work on GitHub.</p><div className="actions"><a className="btn light" href={profile.linkedinUrl ?? "https://www.linkedin.com/in/eltonmalumbot/"} target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="btn outline" href={profile.githubUrl ?? "https://github.com/eltonmalumbot"} target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
      <footer className="footer shell"><span>© 2026 {profile.name}</span><span>Built with Next.js · Neon Postgres · Vercel</span></footer>
    </main>
  );
}

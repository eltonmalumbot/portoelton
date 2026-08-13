import Link from "next/link";
import { projects } from "../data/projects";

const skills = [
  "Moodle Administration",
  "LMS Operations",
  "Moodle Web Services",
  "Workflow Automation",
  "PHP & MySQL",
  "Data & Reporting",
  "Next.js & TypeScript",
  "GitHub & Deployment",
];

const certificates = [
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", note: "Add your first professional or technical certificate here." },
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", note: "This section is ready for LMS, IT, cloud, development, data, or operations credentials." },
  { title: "Certificate Title", issuer: "Issuing organization", year: "Year", note: "Credential links can be added once you send the final certificate list." },
];

export default function Home() {
  const featured = projects.find((p) => p.featured)!;
  const others = projects.filter((p) => !p.featured);

  return (
    <main>
      <header className="header shell">
        <Link href="/" className="brand"><span>EM</span> Elton Malumbot</Link>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero shell">
        <div>
          <p className="eyebrow">LMS · EDUCATIONAL TECHNOLOGY · SYSTEMS</p>
          <h1>I build systems that make learning technology easier to operate.</h1>
          <p className="lead">I’m Elton Malumbot, a DevOps Engineer with hands-on experience designing, administering, and improving Moodle-based workflows, LMS operations, and internal digital tools.</p>
          <div className="actions">
            <a className="btn primary" href="#work">Explore my work ↘</a>
            <a className="btn" href="https://www.linkedin.com/in/eltonmalumbot/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <div className="hero-side">
          <div className="photo-card">
            <img src="/elton-profile.png" alt="Elton Malumbot" className="profile-photo" />
          </div>
          <aside className="hero-card">
            <p className="muted tiny">CURRENT FOCUS</p>
            <h2>LMS operations with a builder mindset.</h2>
            <p className="muted">I work at the intersection of platform administration, workflow design, automation, troubleshooting, and web development.</p>
            <div className="stats">
              <div><b>3</b><span>Core LMS projects</span></div>
              <div><b>5</b><span>Case studies</span></div>
              <div><b>API</b><span>Moodle Web Services</span></div>
              <div><b>Ops</b><span>Production workflows</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section id="work" className="section shell">
        <div className="section-head">
          <div><p className="eyebrow">SELECTED WORK</p><h2>Systems built around real operational problems.</h2></div>
          <p className="muted note">The first three projects focus directly on Moodle and LMS operations.</p>
        </div>

        <article className="featured">
          <div>
            <p className="tiny muted">{featured.index} / FEATURED</p>
            <h3>{featured.title}</h3>
            <p className="subtitle">{featured.subtitle}</p>
            <p className="muted copy">{featured.summary}</p>
            <div className="tags">{featured.stack.slice(0,5).map((t) => <span key={t}>{t}</span>)}</div>
            <div className="card-actions">
              <Link className="link" href={`/work/${featured.slug}`}>Read case study ↗</Link>
              <span className="muted">Private source</span>
            </div>
          </div>
          <div className="mock">
            <div className="mock-window">
              <div className="mock-top">● ● ● <span>Moodle SuperTools</span></div>
              <div className="mock-body">
                <aside>SuperTools<br/><b>Bulk Users</b><br/>Cohorts<br/>Courses<br/>Audit<br/>Logs</aside>
                <section><i></i><div><span></span><span></span><span></span></div><p></p><p></p><p></p></section>
              </div>
            </div>
          </div>
        </article>

        <div className="grid">
          {others.map((p) => (
            <article className="card" key={p.slug}>
              <div className="card-meta"><span>{p.index}</span><span>{p.status}</span></div>
              <p className="eyebrow small">{p.eyebrow}</p>
              <h3>{p.title}</h3>
              <p className="subtitle">{p.subtitle}</p>
              <p className="muted copy">{p.summary}</p>
              <div className="tags">{p.stack.slice(0,4).map((t) => <span key={t}>{t}</span>)}</div>
              <div className="card-actions">
                <Link className="link" href={`/work/${p.slug}`}>Case study ↗</Link>
                {p.repoUrl && <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">GitHub{p.repoPrivate ? " 🔒" : ""} ↗</a>}
                {p.liveUrl && <a className="muted" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dark">
        <div className="section shell two">
          <div><p className="eyebrow pale">WHAT I BRING</p><h2>Not only administration. Not only development.</h2><p>I understand how people use an LMS, then translate that into safer workflows, automation, tools, and technical improvements.</p></div>
          <div className="skills">{skills.map((s,i) => <div key={s}><span>{String(i+1).padStart(2,"0")}</span><b>{s}</b></div>)}</div>
        </div>
      </section>

      <section id="about" className="section shell two">
        <div><p className="eyebrow">ABOUT</p><h2>Technology should remove friction from work.</h2></div>
        <div>
          <p className="about-lead">I’m currently a DevOps Engineer at BPK PENABUR Jakarta. My portfolio has grown around Moodle, education technology, operational systems, and practical web products.</p>
          <p className="muted copy">I enjoy turning repetitive or error-prone processes into tools people can actually use—whether that means a Moodle administration platform, a custom LMS activity, a service portal, or a full-stack education product.</p>
          <div className="facts">
            <div><span>Current role</span><b>DevOps Engineer</b></div>
            <div><span>Organization</span><b>BPK PENABUR Jakarta</b></div>
            <div><span>Education</span><b>STMIK Dharma Putra</b></div>
            <div><span>Based in</span><b>Jakarta, Indonesia</b></div>
          </div>
        </div>
      </section>

      <section id="certificates" className="section cert-section">
        <div className="shell">
          <div className="section-head">
            <div><p className="eyebrow">CERTIFICATES</p><h2>Professional learning and certifications.</h2></div>
            <p className="muted note">Send the certificate list when ready and these cards can be replaced with the final credentials.</p>
          </div>
          <div className="cert-grid">
            {certificates.map((cert, i) => (
              <article className="cert-card" key={i}>
                <div><span className="cert-badge">CERTIFICATE</span><h3>{cert.title}</h3><p className="cert-meta">{cert.issuer} · {cert.year}</p><p className="muted copy">{cert.note}</p></div>
                <span className="link">Credential details ↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="shell">
          <p className="eyebrow pale">LET’S CONNECT</p>
          <h2>Interested in LMS, EdTech, or systems that simplify operations?</h2>
          <p>See my professional background on LinkedIn or browse my public work on GitHub.</p>
          <div className="actions">
            <a className="btn light" href="https://www.linkedin.com/in/eltonmalumbot/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn outline" href="https://github.com/eltonmalumbot" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <footer className="footer shell"><span>© 2026 Elton Malumbot</span><span>Built with Next.js · Deployed on Vercel</span></footer>
    </main>
  );
}

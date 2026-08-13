import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.title} — Elton Malumbot`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main>
      <header className="header shell"><Link href="/" className="brand"><span>EM</span> Elton Malumbot</Link><Link href="/#work" className="muted">← All projects</Link></header>
      <section className="case-hero shell"><div className="card-meta"><span>{project.index}</span><span>{project.status}</span></div><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-sub">{project.subtitle}</p><p className="case-summary">{project.summary}</p><div className="actions">{project.liveUrl && <a className="btn primary" href={project.liveUrl} target="_blank" rel="noreferrer">Open live demo ↗</a>}{project.repoUrl && <a className="btn" href={project.repoUrl} target="_blank" rel="noreferrer">View GitHub ↗</a>}</div></section>
      <section className="case-band"><div className="shell case-band-grid"><div><span>My role</span><b>{project.role.slice(0,3).join(" · ")}</b></div><div><span>Core stack</span><b>{project.stack.slice(0,4).join(" · ")}</b></div><div><span>Domain</span><b>{project.eyebrow}</b></div></div></section>
      <section className="section shell case-layout"><aside className="case-nav"><span>CASE STUDY</span><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#features">Features</a><a href="#outcome">Outcome</a></aside><div className="case-content">
        <section id="problem" className="case-block"><p className="eyebrow">01 · PROBLEM</p><h2>The operational challenge</h2><p>{project.problem}</p></section>
        <section id="solution" className="case-block"><p className="eyebrow">02 · SOLUTION</p><h2>How I approached it</h2><p>{project.solution}</p><div className="role-grid">{project.role.map(r=><div key={r}>{r}</div>)}</div></section>
        <section id="features" className="case-block"><p className="eyebrow">03 · KEY FEATURES</p><h2>What the system does</h2><div className="feature-list">{project.features.map((f,i)=><div key={f}><span>{String(i+1).padStart(2,"0")}</span><p>{f}</p></div>)}</div></section>
        <section className="case-block"><p className="eyebrow">04 · TECHNOLOGY</p><h2>Tools and platform</h2><div className="tags large">{project.stack.map(t=><span key={t}>{t}</span>)}</div></section>
        <section id="outcome" className="outcome"><p className="eyebrow pale">05 · OUTCOME</p><h2>{project.outcome}</h2></section>
        <div className="next"><span className="muted">Continue exploring</span><Link className="link" href="/#work">Back to selected work →</Link></div>
      </div></section>
      <footer className="footer shell"><span>© 2026 Elton Malumbot</span><span>Portfolio case study</span></footer>
    </main>
  );
}

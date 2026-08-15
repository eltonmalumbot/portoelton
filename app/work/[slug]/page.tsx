import Link from "next/link";
import { notFound } from "next/navigation";
import { projects as fallbackProjects } from "../../../data/projects";
import { getPortfolioProject, getProjectImages } from "../../../lib/portfolio";
import ThemeToggle from "../../theme-toggle";

export const dynamic = "force-dynamic";

const localProjectImages: Record<string, string[]> = {
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
    "/projects/moodle-service-portal/stats.webp",
    "/projects/moodle-service-portal/users.webp",
  ],
};

export function generateStaticParams(){return fallbackProjects.map((project)=>({slug:project.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=await getPortfolioProject(slug);return project?{title:`${project.title} — Elton Malumbot`,description:project.summary}:{};}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=await getPortfolioProject(slug);
  if(!project)notFound();
  const dbImages=await getProjectImages(slug);
  const images=dbImages.length>0 ? dbImages : (localProjectImages[slug] ?? []);

  return <main>
    <header className="header shell">
      <Link href="/" className="brand"><span>EM</span> Elton Malumbot</Link>
      <div className="header-actions"><Link href="/#work" className="muted">← All projects</Link><ThemeToggle /></div>
    </header>

    <section className="case-hero shell"><div className="card-meta"><span>{project.index}</span><span>{project.status}</span></div><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-sub">{project.subtitle}</p><p className="case-summary">{project.summary}</p><div className="actions">{project.liveUrl&&<a className="btn primary" href={project.liveUrl} target="_blank" rel="noreferrer">Open live demo ↗</a>}{project.repoUrl&&<a className="btn" href={project.repoUrl} target="_blank" rel="noreferrer">View GitHub{project.repoPrivate?" 🔒":""} ↗</a>}{project.featured&&!project.repoUrl&&<span className="btn">Private source</span>}</div></section>

    {project.liveUrl ? <section className="shell project-live-detail"><div className="live-detail-frame"><iframe src={project.liveUrl} title={`${project.title} live website`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" /><div className="live-preview-topline"><span className="live-dot" /> LIVE WEBSITE</div><a className="media-click-layer" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live website`} /></div><p className="muted live-detail-note">This is a live preview of the deployed project, not a recreated portfolio mockup.</p></section> : images.length>0 ? <section className="shell project-gallery">{images.map((src,i)=><figure key={`${src}-${i}`}><img src={src} alt={`${project.title} screenshot ${i+1}`} /><figcaption>{project.title} · Real project media {String(i+1).padStart(2,"0")}</figcaption></figure>)}</section> : <section className="shell internal-media-note"><p className="eyebrow">PROJECT MEDIA</p><h2>No fabricated screenshot.</h2><p className="muted">This project contains internal or private operational data. The case study documents the real workflow and implementation without displaying invented interface imagery.</p></section>}

    <section className="case-band"><div className="shell case-band-grid"><div><span>My role</span><b>{project.role.slice(0,3).join(" · ")}</b></div><div><span>Core stack</span><b>{project.stack.slice(0,4).join(" · ")}</b></div><div><span>Domain</span><b>{project.eyebrow}</b></div></div></section>
    <section className="section shell case-layout"><aside className="case-nav"><span>CASE STUDY</span><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#features">Features</a>{project.pluginNote&&<a href="#plugin">Plugin</a>}<a href="#outcome">Outcome</a></aside><div className="case-content"><section id="problem" className="case-block"><p className="eyebrow">01 · PROBLEM</p><h2>The operational challenge</h2><p>{project.problem}</p></section><section id="solution" className="case-block"><p className="eyebrow">02 · SOLUTION</p><h2>How I approached it</h2><p>{project.solution}</p><div className="role-grid">{project.role.map(r=><div key={r}>{r}</div>)}</div></section><section id="features" className="case-block"><p className="eyebrow">03 · KEY FEATURES</p><h2>What the system does</h2><div className="feature-list">{project.features.map((f,i)=><div key={f}><span>{String(i+1).padStart(2,"0")}</span><p>{f}</p></div>)}</div></section>{project.pluginNote&&<section id="plugin" className="case-block"><p className="eyebrow">04 · MOODLE PLUGIN</p><h2>Companion plugin: local_supertools</h2><p>{project.pluginNote}</p><div className="tags large"><span>local_supertools</span><span>Moodle Local Plugin</span><span>Custom Web Services</span><span>Capabilities</span></div></section>}<section className="case-block"><p className="eyebrow">{project.pluginNote?"05":"04"} · TECHNOLOGY</p><h2>Tools and platform</h2><div className="tags large">{project.stack.map(t=><span key={t}>{t}</span>)}</div></section><section id="outcome" className="outcome"><p className="eyebrow pale">{project.pluginNote?"06":"05"} · OUTCOME</p><h2>{project.outcome}</h2></section><div className="next"><span className="muted">Continue exploring</span><Link className="link" href="/#work">Back to selected work →</Link></div></div></section>
    <footer className="footer shell"><span>© 2026 Elton Malumbot</span><span>Portfolio case study</span></footer>
  </main>;
}

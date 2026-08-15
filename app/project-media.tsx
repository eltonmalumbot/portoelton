import Link from "next/link";
import type { Project } from "../data/projects";

const projectScreenshots: Record<string, string> = {
  supertools: "/projects/supertools-01.svg",
  unifair: "/projects/unifair-01.svg",
  "moodle-service-portal": "/projects/msp-01.svg",
};

const internalMedia: Record<string, { label: string; detail: string }> = {
  supertools: { label: "INTERNAL LMS TOOL", detail: "Moodle administration and automation platform." },
  unifair: { label: "CUSTOM MOODLE MODULE", detail: "Custom Moodle workflow for university fair scheduling and student selection." },
  "moodle-service-portal": { label: "INTERNAL SERVICE PLATFORM", detail: "Centralized LMS service management workflow." },
};

export default function ProjectMedia({ project, featured = false }: { project: Project; featured?: boolean }) {
  const className = featured ? "project-visual featured-visual" : "project-thumb";

  if (project.liveUrl) {
    return (
      <div className={`${className} live-project-media`}>
        <iframe src={project.liveUrl} title={`${project.title} live website preview`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms" tabIndex={-1} />
        <div className="live-preview-topline"><span className="live-dot" /> LIVE WEBSITE</div>
        <a className="media-click-layer" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live website`} />
      </div>
    );
  }

  const screenshot = projectScreenshots[project.slug];
  if (screenshot) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className={className}
        style={{ position: "relative", overflow: "hidden", display: "block", minHeight: featured ? 460 : 230, background: "var(--surface)", borderRadius: featured ? 0 : 18, marginBottom: featured ? 0 : 30 }}
      >
        <img src={screenshot} alt={`${project.title} interface preview`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, padding: "12px 14px", borderRadius: 14, background: "rgba(8,17,29,.88)", color: "#fff", backdropFilter: "blur(8px)", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 9, letterSpacing: ".12em", opacity: .72 }}>PROJECT INTERFACE</span>
          <strong style={{ fontSize: 12 }}>{project.title}</strong>
        </div>
      </Link>
    );
  }

  const media = internalMedia[project.slug] ?? { label: "PROJECT CASE STUDY", detail: "Project case study." };
  return (
    <Link href={`/work/${project.slug}`} className={`${className} honest-project-media`}>
      <div className="honest-project-media-inner"><span className="media-kicker">{media.label}</span><strong>{project.title}</strong><p>{media.detail}</p><span className="media-case-link">Open case study ↗</span></div>
    </Link>
  );
}

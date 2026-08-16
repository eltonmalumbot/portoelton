import Link from "next/link";
import type { Project } from "../data/projects";

const projectLogos: Record<string, string> = {
  supertools: "/projects/supertools-logo.svg",
  unifair: "/projects/unifair-logo.svg",
  "moodle-service-portal": "/projects/msp-logo.svg",
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

  if (project.coverImageUrl) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "block",
          minHeight: featured ? 460 : 250,
          borderRadius: featured ? 0 : 18,
          marginBottom: featured ? 0 : 30,
          background: "#0d1b2a",
        }}
      >
        <img
          src={project.coverImageUrl}
          alt={`${project.title} cover`}
          style={{
            display: "block",
            width: "100%",
            height: featured ? 460 : 250,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: featured ? 22 : 16,
            right: featured ? 22 : 16,
            bottom: featured ? 22 : 16,
            minHeight: 48,
            padding: "12px 14px",
            borderRadius: 14,
            background: "rgba(8,17,29,.86)",
            color: "#fff",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: ".12em", opacity: .72 }}>PROJECT DOCUMENTATION</span>
          <strong style={{ fontSize: 12, textAlign: "right" }}>{project.title}</strong>
        </div>
      </Link>
    );
  }

  const logo = projectLogos[project.slug];
  if (logo) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: featured ? 460 : 250,
          background: "#f8fafc",
          borderRadius: featured ? 0 : 18,
          marginBottom: featured ? 0 : 30,
          padding: featured ? "52px 58px 100px" : "34px 34px 88px",
          boxSizing: "border-box",
        }}
      >
        <img
          src={logo}
          alt={`${project.title} logo`}
          style={{
            display: "block",
            width: "auto",
            height: "auto",
            maxWidth: featured ? "88%" : "92%",
            maxHeight: featured ? 270 : 145,
            objectFit: "contain",
            objectPosition: "center",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: featured ? 22 : 16,
            right: featured ? 22 : 16,
            bottom: featured ? 22 : 16,
            minHeight: 48,
            padding: "12px 14px",
            borderRadius: 14,
            background: "rgba(8,17,29,.88)",
            color: "#fff",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: ".12em", opacity: .72 }}>PROJECT LOGO</span>
          <strong style={{ fontSize: 12, textAlign: "right" }}>{project.title}</strong>
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

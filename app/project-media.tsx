import Link from "next/link";
import type { Project } from "../data/projects";

const projectScreenshots: Record<string, string> = {
  supertools: "/projects/supertools/cover.webp",
  unifair: "/projects/unifair/cover.webp",
  "moodle-service-portal": "/projects/moodle-service-portal/cover.webp",
};

const internalMedia: Record<string, { label: string; detail: string }> = {
  supertools: {
    label: "INTERNAL LMS TOOL",
    detail: "Real interface screenshot with sensitive operational data excluded from the portfolio.",
  },
  unifair: {
    label: "CUSTOM MOODLE MODULE",
    detail: "Real Moodle interface from the UniFair workflow.",
  },
  "moodle-service-portal": {
    label: "INTERNAL SERVICE PLATFORM",
    detail: "Real interface screenshot with personal and internal request data redacted.",
  },
};

export default function ProjectMedia({ project, featured = false }: { project: Project; featured?: boolean }) {
  const className = featured ? "project-visual featured-visual" : "project-thumb";

  if (project.liveUrl) {
    return (
      <div className={`${className} live-project-media`}>
        <iframe
          src={project.liveUrl}
          title={`${project.title} live website preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
          tabIndex={-1}
        />
        <div className="live-preview-topline"><span className="live-dot" /> LIVE WEBSITE</div>
        <a className="media-click-layer" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live website`} />
      </div>
    );
  }

  const screenshot = projectScreenshots[project.slug];
  if (screenshot) {
    return (
      <Link href={`/work/${project.slug}`} className={`${className} screenshot-project-media`}>
        <img src={screenshot} alt={`${project.title} real interface screenshot`} />
        <div className="screenshot-project-label">
          <span>REAL PROJECT SCREENSHOT</span>
          <strong>{project.title}</strong>
        </div>
      </Link>
    );
  }

  const media = internalMedia[project.slug] ?? {
    label: "PROJECT CASE STUDY",
    detail: "No public screenshot is available for this project.",
  };

  return (
    <Link href={`/work/${project.slug}`} className={`${className} honest-project-media`}>
      <div className="honest-project-media-inner">
        <span className="media-kicker">{media.label}</span>
        <strong>{project.title}</strong>
        <p>{media.detail}</p>
        <span className="media-case-link">Open case study ↗</span>
      </div>
    </Link>
  );
}

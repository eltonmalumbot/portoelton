"use client";

import Arrow from "./arrow";
import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "../data/projects";

const sourceBasedCovers = new Set([
  "commuterline-ai",
  "telaah",
  "supermoodle",
  "school-user-manager",
  "project-handoff-hub",
  "peoplelens",
]);
// Existing documentation and browser captures of the real public demos.
// Neon-provided covers take precedence. Capture provenance is in docs/media-sources.md.
const localCovers: Record<string, string> = {
  supertools: "/projects/supertools/cover.webp",
  unifair: "/projects/unifair/cover.webp",
  "moodle-service-portal": "/projects/moodle-service-portal/cover.webp",
  cariskolah: "/projects/cariskolah/live-capture.jpg",
  pindailoker: "/projects/pindailoker/live-capture.jpg",
  prankjessica: "/projects/prankjessica/live-capture.jpg",
  "evergreen-life": "/projects/evergreen-life/live-capture.jpg",
  penaburcombat: "/projects/penaburcombat/live-capture.jpg",
};

export default function ProjectMedia({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewId = useId();
  const cover = project.coverImageUrl || localCovers[project.slug];
  const className = `project-media ${featured ? "featured-visual" : "project-thumb"} project-media-${project.slug}`;
  const artwork = sourceBasedCovers.has(project.slug);
  const coverContent =
    cover && !coverFailed ? (
      <Image
        src={cover}
        sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 96px) / 2), 608px"
        unoptimized={!cover.startsWith("/")}
        alt={`${project.title} ${artwork ? "workflow artwork, not an application screenshot" : "project screenshot"}`}
        width="1200"
        height="675"
        loading="lazy"
        decoding="async"
        onError={() => setCoverFailed(true)}
        ref={(node) => {
          if (node?.complete && node.naturalWidth === 0) setCoverFailed(true);
        }}
      />
    ) : (
      <div className="project-identity">
        <span className="media-kicker">
          {coverFailed ? "Project study" : project.eyebrow}
        </span>
        <strong>{project.title}</strong>
        <span className="media-stack">
          {project.stack.slice(0, 3).join(" / ")}
        </span>
        {!project.liveUrl && (
          <span className="media-case-link">
            Read case study <Arrow />
          </span>
        )}
      </div>
    );

  // Keep a stable toggle for keyboard focus. No remote app runs until requested.
  if (project.liveUrl) {
    return (
      <div className={`${className} live-project-media`}>
        {previewOpen ? (
          <>
            <iframe
              id={previewId}
              src={project.liveUrl}
              title={`${project.title} live website preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              tabIndex={-1}
            />
            <a
              className="media-click-layer"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live website in a new tab`}
            />
          </>
        ) : (
          <Link
            prefetch={false}
            href={`/work/${project.slug}`}
            className="project-cover-link"
            aria-label={`Read ${project.title} case study`}
          >
            {coverContent}
          </Link>
        )}
        <button
          className="preview-button"
          type="button"
          onClick={() => setPreviewOpen((open) => !open)}
          aria-expanded={previewOpen}
          aria-controls={previewOpen ? previewId : undefined}
          aria-label={`${previewOpen ? "Close" : "Load"} ${project.title} live preview`}
        >
          {previewOpen ? "Close preview ×" : "Load live preview"}
          {!previewOpen && <Arrow />}
        </button>
      </div>
    );
  }
  return (
    <Link
      prefetch={false}
      href={`/work/${project.slug}`}
      className={`${className} ${artwork ? "contained-cover" : ""}`}
      aria-label={`Read ${project.title} case study`}
    >
      {coverContent}
    </Link>
  );
}

"use client";

import { useState } from "react";

type GalleryMediaProps = {
  src: string;
  projectTitle: string;
  projectSlug: string;
  index: number;
};

const projectLogos: Record<string, string> = {
  supertools: "/projects/supertools-logo.svg",
  unifair: "/projects/unifair-logo.svg",
  "moodle-service-portal": "/projects/msp-logo.svg",
};

const fallbackLabels: Record<string, string[]> = {
  supertools: [
    "Moodle administration workspace",
    "Bulk user provisioning workflow",
  ],
  unifair: [
    "UniFair session management",
    "Student university selection workflow",
  ],
  "moodle-service-portal": [
    "Moodle service portal overview",
    "Service request dashboard",
    "User and school administration",
  ],
};

export default function ProjectGalleryMedia({ src, projectTitle, projectSlug, index }: GalleryMediaProps) {
  const [failed, setFailed] = useState(false);
  const logo = projectLogos[projectSlug];
  const fallbackLabel = fallbackLabels[projectSlug]?.[index] ?? `${projectTitle} project interface`;

  return (
    <figure className={failed ? "gallery-fallback-active" : undefined}>
      {!failed ? (
        <img
          src={src}
          alt={`${projectTitle} screenshot ${index + 1}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="gallery-media-fallback" role="img" aria-label={`${projectTitle}: ${fallbackLabel}`}>
          {logo ? <img src={logo} alt="" className="gallery-fallback-logo" /> : null}
          <div className="gallery-fallback-copy">
            <span>PROJECT INTERFACE</span>
            <strong>{fallbackLabel}</strong>
            <p>Project media is unavailable in this portfolio build, so the project identity is shown instead of a broken image.</p>
          </div>
        </div>
      )}
      <figcaption>
        {projectTitle} · {failed ? "Project visual" : "Real project media"} {String(index + 1).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "../data/projects";
import ProjectMedia from "./project-media";
import {
  projectCategories, categoriesForProject, categoryName,
  filterPortfolioProjects, type ProjectCategory,
} from "../lib/project-taxonomy";

export default function ProjectCatalog({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);

  // Counts are based on visible published projects only (including Neon records).
  const availableCategories = useMemo(
    () => projectCategories.filter((item) =>
      item.id === "all" || projects.some((p) => categoriesForProject(p).includes(item.id)),
    ),
    [projects],
  );
  const counts = useMemo(
    () => Object.fromEntries(availableCategories.map((item) => [
      item.id,
      item.id === "all" ? projects.length :
        projects.filter((p) => categoriesForProject(p).includes(item.id)).length,
    ])),
    [availableCategories, projects],
  );
  const results = useMemo(
    () => filterPortfolioProjects(projects, category, search, liveOnly),
    [projects, category, search, liveOnly],
  );
  const filtersActive = category !== "all" || !!search.trim() || liveOnly;

  const resetFilters = () => {
    setCategory("all");
    setSearch("");
    setLiveOnly(false);
  };

  return (
    <div className="portfolio-catalog">
      <div className="portfolio-filter-bar" aria-label="Filter portfolio projects">
        <div className="portfolio-search-row">
          <label className="portfolio-search-field">
            <span className="portfolio-search-label">Search projects</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects, skills, or technologies…"
              autoComplete="off"
            />
          </label>
          <label className="portfolio-live-toggle">
            <input type="checkbox" checked={liveOnly} onChange={(event) => setLiveOnly(event.target.checked)} />
            <span>Live demos only</span>
          </label>
        </div>
        <div className="portfolio-category-controls" role="group" aria-label="Project category">
          {availableCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "portfolio-category-chip is-active" : "portfolio-category-chip"}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label} <span aria-hidden="true">{counts[item.id]}</span>
            </button>
          ))}
        </div>
        <div className="portfolio-results-heading">
          <p role="status" aria-live="polite">
            Showing <strong>{results.length}</strong> of <strong>{projects.length}</strong> projects
            {category !== "all" ? ` · ${categoryName(category)}` : ""}
          </p>
          {filtersActive ? (
            <button type="button" className="portfolio-reset" onClick={resetFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
      </div>
      {results.length > 0 ? (
        <div className="grid portfolio-project-grid" id="project-results">
          {results.map((p) => (
            <article className="card" key={p.slug}>
              <ProjectMedia project={p} />
              <div className="card-meta">
                <span>{p.index}</span><span>{p.featured ? `Featured · ${p.status}` : p.status}</span>
              </div>
              <div className="portfolio-card-categories" aria-label="Categories">
                {categoriesForProject(p).slice(0, 2).map((tag) => (
                  <span key={tag}>{categoryName(tag)}</span>
                ))}
              </div>
              <p className="eyebrow small">{p.eyebrow}</p>
              <h3>{p.title}</h3>
              <p className="subtitle">{p.subtitle}</p>
              <p className="muted copy">{p.summary}</p>
              <div className="tags">{p.stack.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>
              <div className="card-actions">
                <Link className="link" href={`/work/${p.slug}`}>Case study ↗</Link>
                {p.repoUrl && <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">GitHub{p.repoPrivate ? " 🔒" : ""} ↗</a>}
                {p.liveUrl && <a className="muted" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="portfolio-no-results" role="status">
          <h3>No matching projects</h3>
          <p>Try another category, keyword, or turn off the live demo filter.</p>
          <button type="button" className="portfolio-reset" onClick={resetFilters}>Show all projects</button>
        </div>
      )}
    </div>
  );
}

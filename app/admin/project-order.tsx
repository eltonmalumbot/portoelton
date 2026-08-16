"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { reorderProjectsAction } from "./project-order-actions";

type ProjectRow = {
  slug: string;
  title: string;
  published: boolean;
};

export default function ProjectOrder({ projects }: { projects: ProjectRow[] }) {
  const [items, setItems] = useState(projects);
  const [draggedSlug, setDraggedSlug] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const slugs = useMemo(() => items.map((item) => item.slug), [items]);

  const persist = (next: ProjectRow[]) => {
    setItems(next);
    setSaved(false);
    startTransition(async () => {
      await reorderProjectsAction(next.map((item) => item.slug));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    });
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length || isPending) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    persist(next);
  };

  const dropBefore = (targetSlug: string) => {
    if (!draggedSlug || draggedSlug === targetSlug || isPending) return;
    const next = [...items];
    const from = next.findIndex((item) => item.slug === draggedSlug);
    const target = next.findIndex((item) => item.slug === targetSlug);
    if (from < 0 || target < 0) return;
    const [moved] = next.splice(from, 1);
    const adjustedTarget = from < target ? target - 1 : target;
    next.splice(adjustedTarget, 0, moved);
    setDraggedSlug(null);
    persist(next);
  };

  return (
    <div className="admin-order-wrap">
      <div className="admin-order-head">
        <div>
          <h2>Project order</h2>
          <p className="admin-note">Drag projects to change their position. Position #1 becomes the featured project on the homepage.</p>
        </div>
        <span className={`admin-order-save ${saved ? "saved" : ""}`}>{isPending ? "Saving…" : saved ? "Saved" : `${slugs.length} projects`}</span>
      </div>
      <div className="admin-order-list">
        {items.map((project, index) => (
          <div
            className={`admin-order-item ${draggedSlug === project.slug ? "dragging" : ""}`}
            key={project.slug}
            draggable={!isPending}
            onDragStart={() => setDraggedSlug(project.slug)}
            onDragEnd={() => setDraggedSlug(null)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropBefore(project.slug)}
          >
            <button className="admin-drag-handle" type="button" aria-label={`Drag ${project.title}`} title="Drag to reorder">⋮⋮</button>
            <span className="admin-order-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="admin-order-copy">
              <strong>{project.title}</strong>
              <span className="admin-muted">/{project.slug}</span>
            </div>
            <div className="admin-order-actions">
              {index === 0 && <span className="admin-featured-badge">Featured</span>}
              <span className="admin-status">{project.published ? "Published" : "Draft"}</span>
              <button className="admin-btn small admin-move" type="button" disabled={index === 0 || isPending} onClick={() => move(index, -1)} aria-label={`Move ${project.title} up`}>↑</button>
              <button className="admin-btn small admin-move" type="button" disabled={index === items.length - 1 || isPending} onClick={() => move(index, 1)} aria-label={`Move ${project.title} down`}>↓</button>
              <Link className="admin-btn small" href={`/admin/project/${project.slug}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

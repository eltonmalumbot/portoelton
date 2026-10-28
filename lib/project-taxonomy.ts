import type { Project } from "../data/projects";

export const projectCategories = [
  { id: "all", label: "All projects" },
  { id: "lms", label: "LMS & Education" },
  { id: "ai", label: "AI & Data" },
  { id: "web", label: "Web Platforms" },
  { id: "creative", label: "Games & Creative" },
  { id: "ops", label: "Ops & Automation" },
  { id: "other", label: "Other Projects" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];
export type SpecificCategory = Exclude<ProjectCategory, "all">;

// These tags describe verified portfolio case studies, not inferred products or capabilities.
// The same slug is used for Neon-managed entries and Git-backed fallback entries.
const bySlug: Record<string, readonly SpecificCategory[]> = {
  "bpk-penabur-moodle-operations": ["lms", "ops"],
  supertools: ["lms", "ops"],
  unifair: ["lms"],
  "moodle-service-portal": ["lms", "web", "ops"],
  "moodle-teacher-training": ["lms", "ops"],
  cariskolah: ["lms", "web"],
  pindailoker: ["ai", "web"],
  prankjessica: ["creative"],
  pairfuel: ["ai", "web"],
  "elton-office": ["ai", "web", "ops"],
  "commuterline-ai": ["ai", "web"],
  telaah: ["lms", "ai", "web"],
  "evergreen-life": ["creative"],
  penaburcombat: ["creative"],
  supermoodle: ["lms", "ops"],
  "school-user-manager": ["lms", "ops"],
};

/** Unknown Neon projects remain visible, under "Other Projects", without invented tags. */
export function categoriesForProject(project: Pick<Project, "slug">): readonly SpecificCategory[] {
  return bySlug[project.slug] ?? ["other"];
}

export function categoryName(id: ProjectCategory): string {
  return projectCategories.find((category) => category.id === id)?.label ?? "Other Projects";
}

export function filterPortfolioProjects(
  projects: readonly Project[],
  category: ProjectCategory,
  query: string,
  liveOnly: boolean,
): Project[] {
  const search = query.trim().toLocaleLowerCase("en");
  return projects.filter((project) => {
    if (category !== "all" && !categoriesForProject(project).includes(category)) return false;
    if (liveOnly && !project.liveUrl) return false;
    if (!search) return true;
    const searchable = [
      project.title, project.subtitle, project.summary,
      project.eyebrow, project.status, ...project.stack,
      ...categoriesForProject(project).map(categoryName),
    ].join(" ").toLocaleLowerCase("en");
    return searchable.includes(search);
  });
}

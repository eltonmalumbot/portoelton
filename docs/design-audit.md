# Design audit and implementation

Baseline: `main` at `32bb44cbee3c23a613cf6a11f6842497614f048e`, and the real production site before changes.

| Area | Finding | Change |
| --- | --- | --- |
| Hero | Long headline, decorative landscape, orbit/glow layers and a second boxed pitch compete with the engineering identity. | Plain DevOps/full-stack introduction, real portrait, location and a single primary work action. |
| Typography | Many tiny uppercase labels, large dense project titles, inconsistent scales. | Serif display plus system sans, controlled heading scale, larger readable body text and quieter metadata. |
| Layout | Six public stylesheets override one another. Heavy rounded panels and nested boxes dominate. | One public stylesheet, shared edges, spacing, restrained borders and flat theme tokens. Existing admin stylesheet remains separate. |
| Catalog | Every live project starts an embedded application; some images fail before hydration. | Real screenshots, lazy responsive image loading, opt-in live previews, stable keyboard focus and readable image-error fallbacks. |
| Featured work | Newest engineering projects are buried at the end of the index. | A dedicated two-project section, derived only from the published project list. Full catalog remains intact. |
| Case studies | Strong engineering narrative is hard to scan, while recorded tests and release limitations are mixed into feature lists. | Clearer reading measure and section navigation, a shared architecture/evidence section, and explicit project-specific release gates. |
| Media | Two SuperTools files cannot be decoded; two legacy SVGs are invalid XML. | Recover real originals from Git history and escape bare ampersands. PeopleLens and Handoff Hub remain honest process illustrations. |
| Data | An empty published result or database exception can resurrect local entries. | Successful Neon responses remain authoritative; configured-database failures withhold content. Tests cover unpublished entries, precedence, and outage behavior. |
| Theme/accessibility | Small theme controls rely on symbols; reduced-motion coverage is fragmented. | Named SVG controls, keyboard skip link, visible focus, persistent theme, and a single reduced-motion policy. |
| About / skills / certificates / contact | Repeated panels and inconsistent visual weight compete with project evidence. | Ruled skills index, quieter professional facts and credential cards, simple contact band; all data and destinations retained. |

## Constraints preserved

Next.js, TypeScript, Neon, admin actions, project/certificate data, search, category filters, live demos, themes, URLs, SEO metadata, GitHub and Vercel integration remain. No live database writes, environment-variable changes or credential changes are part of this work.

The historical project test counts are existing recorded evidence, not tests rerun against Handoff Hub or PeopleLens during this portfolio change. Staging validation is distinct from production approval.

## Taste Skill

Taste Skill 2.5.0 was installed locally and read with the layout, system, copy, sections, motion and performance references. Its visual principles guide this implementation. Its starter-specific fixed-height sections, sample business identity, generated product UI and mandatory decorative effects would conflict with this brief, so existing framework and truthful content take priority. The layout checker reports `container: no .wrap` at all four widths because this repository uses `.shell`; it reports no horizontal overflow. This is a tooling mismatch, not a passed full Taste checklist. Native-browser layout and accessibility checks independently verify the actual containers and routes.

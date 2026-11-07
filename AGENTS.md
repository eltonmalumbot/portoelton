# Portfolio agent guidance

This repository is a personal software engineering portfolio. Preserve its real project history and clear distinction between tested prototypes, staging validation, and production deployment.

## Design quality

The recommended design skill is [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), install name `design-taste-frontend`.

From the project root, use `npm run setup:design-skill` to install the official skill **locally for Codex**. It is opt-in, not a runtime dependency. Read the installed `.agents/skills/design-taste-frontend/SKILL.md` and the relevant references before future visual redesigns. If installation is unavailable, follow the repository-specific standards below; do not claim the external skill is installed.

- Use a clear visual hierarchy, controlled typography, consistent edges and spacing, and a restrained palette. Keep the portfolio focused on genuine engineering evidence.
- Prefer real, permission-cleared project images. When screens contain private employee, production, or client data, use clearly labeled original process artwork, not fabricated screenshots.
- Avoid generic dark gradient panels, repeated decorative cards, meaningless badges, and oversized disclaimer overlays.
- Do not invent metrics, user counts, runtime results, deployment states, or live features.
- For project covers, keep the title legible at 390px and 1440px and use useful hover/focus behavior without animation-heavy effects.
- Validate SVG/XML before commit, especially ampersands in any attribute or text: write `&amp;`. For PNG/JPG/SVG errors, the portfolio cards must retain a readable fallback.
- Check accessibility, image aspect ratio, keyboard focus, reduced-motion support, and both light/dark themes.

## Deployment and content

- Project catalog data is in `data/projects.ts`. A Neon PostgreSQL entry takes precedence, including intentionally unpublished entries; do not republish an unpublished Neon project via fallback.
- `lib/portfolio.ts` controls the database-aware fallback. `lib/project-taxonomy.ts` controls categories.
- The two editorial case studies `project-handoff-hub` and `peoplelens` are **not** production application screenshots. Their artwork is housed under `public/projects/<slug>/cover.svg`.
- Project Handoff Hub's code QA does not prove production OAuth/Neon deployment.
- PeopleLens has a staged release gate. Never claim authorization for real Moodle production provisioning or disclose employee details, access tokens or internal network configuration.
- Before merging, run `npm run build`, inspect Vercel Preview, and verify the image URLs plus both case-study routes. Do not edit live Neon data without a separate explicit request.

# Elton Malumbot — Portfolio

Personal portfolio showcasing work across DevOps, AI-assisted web engineering, full-stack product development, Moodle/LMS operations, systems automation, and educational technology.

## Core stack

- Next.js 16 / React 19 / TypeScript
- Vercel deployment
- Supabase / PostgreSQL
- Neon PostgreSQL / Neon Auth
- Docker / Linux
- Jenkins / GitLab CI/CD
- Prometheus / Grafana
- Moodle / Moodle Web Services

## Portfolio focus

The portfolio combines production-oriented LMS and systems work with modern web products. Case studies include Moodle administration and custom plugins, internal operational tools, full-stack applications, cloud databases, and AI-assisted product workflows.

## Local development

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
```

## Deployment

The site is deployed on Vercel and uses Neon PostgreSQL for portfolio content managed by the application backend.

## Quality checks

```bash
npm test
npm run typecheck
npm run build
```

Publication regression tests mock Neon responses without connecting to or modifying a database. With Neon configured, database failure intentionally withholds public projects and credentials until publication status can be verified.

The design audit, real-media provenance and browser evidence are in [`docs/`](docs/design-audit.md). The public UI uses one stylesheet; historical cinematic styles remain in the repository but are no longer loaded.

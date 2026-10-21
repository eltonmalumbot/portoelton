-- Optional, idempotent publication into PortoElton's OWN Neon database.
-- IMPORTANT: Do not run against the separate Elton Office / neondb database.
-- Once inserted, the portfolio admin (/admin) owns edits and Published state.
-- A code-backed public fallback displays this project until the insert is run.
-- Existing rows with the same slug are never overwritten.
INSERT INTO portfolio_projects (
  slug, title, eyebrow, subtitle, summary, problem, solution, outcome,
  status, repo_url, role_items, feature_items, stack_items,
  repo_private, featured, published, sort_order
) VALUES (
  'elton-office',
  'Elton Office — AI Agent OS',
  'AI Engineering · Agent Orchestration',
  'Private virtual office for AI-assisted GitHub engineering',
  'A private AI engineering workspace that coordinates planning, code generation, review, and guarded GitHub delivery through a Next.js dashboard, Neon-backed task history, and a trusted local worker.',
  'Coordinating AI-assisted development across repositories can fragment planning, code review, approval, and delivery history. Automation also needs clear permission boundaries so AI suggestions do not become uncontrolled changes.',
  'I built an owner-authenticated virtual office that combines GitHub repository workspaces, orchestrated AI roles, the Orion supervisor, CI-gated pull request workflows, and a local worker integrated with Hermes and 9Router. Neon stores task state and audit events, while sensitive actions are protected by explicit policy and owner approval.',
  'An evolving personal AI engineering control center that makes automated development more observable and auditable while retaining repository-scoped permissions and owner-controlled safeguards. This is an active private project, not a publicly available autonomous development service.',
  'Active development · Private repository',
  'https://github.com/eltonmalumbot/ai-virtual-office',
  '["Product concept and architecture","Agent workflow and orchestration","Next.js dashboard and local Node.js worker","GitHub, Neon, and CI/CD integration","Security gates and approval workflows"]'::jsonb,
  '["Agent workflow for Project Manager, Developer, Reviewer, and DevOps responsibilities","Private GitHub OAuth dashboard with repository-scoped task and activity views","Orion Supervisor for approved tasks and sequential multi-repository roadmaps","AI coding integration via local Hermes and 9Router, with configurable model backends","GitHub pull request generation with review and repository-specific CI safeguards","Opt-in automatic merging only when repository policy and CI checks permit it","Owner-approved Neon project, branch, and database provisioning (S4 opt-in)","Isometric virtual office view with agent status and task monitoring"]'::jsonb,
  '["Next.js","React","Node.js","Neon PostgreSQL","GitHub OAuth & API","GitHub Actions","Hermes & 9Router","Vercel"]'::jsonb,
  TRUE,
  FALSE,
  TRUE,
  COALESCE((SELECT MAX(sort_order) + 1 FROM portfolio_projects), 1)
)
ON CONFLICT (slug) DO NOTHING;

/** Editorial summaries of evidence already recorded in data/projects.ts.
 * These are historical project checks, not checks executed by the portfolio. */
export const projectEvidence: Record<
  string,
  {
    title: string;
    flow: { label: string; detail: string }[];
    implementation: string;
    validation: string;
    releaseGate: string;
  }
> = {
  "project-handoff-hub": {
    title: "Project continuity, by design",
    flow: [
      {
        label: "01 / Read",
        detail: "GitHub OAuth + read-only repository metadata",
      },
      {
        label: "02 / Record",
        detail: "Laravel + Livewire · append-only PostgreSQL checkpoints",
      },
      {
        label: "03 / Hand off",
        detail: "Deterministic 13-section Markdown + validated JSON backups",
      },
    ],
    implementation:
      "Owner allowlisting and database sessions protect the workspace. GitHub-fetched metadata stays separate from manual notes; checkpoints retain commit references, decisions, blockers and next steps.",
    validation:
      "Recorded local QA: 41 PHPUnit tests passed, one optional live test skipped, a PostgreSQL run, four Playwright browser tests, and Docker production-mode smoke tests. Repository sync does not execute tests or verify deployments.",
    releaseGate:
      "QA-tested prototype. External Neon connectivity, real production GitHub OAuth and public production deployment remain unverified.",
  },
  peoplelens: {
    title: "Reconciliation before action",
    flow: [
      {
        label: "01 / Compare",
        detail: "HR email lists + scoped Moodle cohort membership",
      },
      {
        label: "02 / Review",
        detail: "PHP + Moodle Web Services · mismatch verification",
      },
      {
        label: "03 / Approve",
        detail: "Preview-first changes · separately authorized writes",
      },
    ],
    implementation:
      "Email matching connects HR records to Moodle 4.4.3 cohort operations. Unknown mismatches require human verification. Tokens stay outside the webroot; sensitive settings require re-authentication and audit logging.",
    validation:
      "Recorded evidence covers synthetic CI, mocked workflows, browser checks and security QA. Completion signals are reviewed with caveats; they do not prove submission or a passing result. No employee records or access tokens are displayed here.",
    releaseGate:
      "The November 3 release decision allowed staging validation only. Real cPanel/Moodle staging UAT and production approval are still release gates; no automatic offboarding is implied.",
  },
};

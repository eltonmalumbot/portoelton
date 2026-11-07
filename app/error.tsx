"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="shell section" tabIndex={-1}>
      <p className="eyebrow">Portfolio / Temporarily unavailable</p>
      <h1>Project data couldn’t be loaded.</h1>
      <p className="muted">Please try again shortly.</p>
      <div className="actions">
        <button className="btn primary" onClick={reset}>
          Try again
        </button>
        <Link className="link" href="/">
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}

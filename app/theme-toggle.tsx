"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("portfolio-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  const choose = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={theme === "light" ? "active" : ""}
        onClick={() => choose("light")}
        aria-pressed={theme === "light"}
        title="Use light theme"
      >
        <span aria-hidden="true">☀</span><span className="theme-label">Light</span>
      </button>
      <button
        type="button"
        className={theme === "dark" ? "active" : ""}
        onClick={() => choose("dark")}
        aria-pressed={theme === "dark"}
        title="Use dark theme"
      >
        <span aria-hidden="true">☾</span><span className="theme-label">Dark</span>
      </button>
    </div>
  );
}

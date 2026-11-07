import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elton Malumbot — DevOps, AI & Web Engineering",
  other: { "page-type": "software", "site-kind": "software" },
  description:
    "Portfolio of Elton Malumbot: DevOps engineering, AI-assisted web development, Next.js products, Vercel deployments, Supabase, Neon PostgreSQL, Moodle LMS, and systems automation.",
};

const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-type="software"
      data-radius="sharp"
      data-motion
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "./project-images.css";
import "./cinematic.css";
import "./cinematic-parallax.css";

export const metadata: Metadata = {
  title: "Elton Malumbot — LMS & Educational Technology",
  description: "Portfolio of Elton Malumbot: LMS operations, Moodle automation, educational technology, internal systems, and full-stack web products.",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

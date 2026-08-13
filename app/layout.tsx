import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elton Malumbot — LMS & Educational Technology",
  description: "Portfolio of Elton Malumbot: LMS operations, Moodle automation, educational technology, internal systems, and full-stack web products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

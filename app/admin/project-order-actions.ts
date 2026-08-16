"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/admin-auth";

function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
}

export async function reorderProjectsAction(slugs: string[]) {
  await requireAdmin();

  const order = [...new Set(slugs.map((slug) => String(slug).trim()).filter(Boolean))];
  const sql = db();
  const rows = await sql`SELECT slug FROM portfolio_projects ORDER BY sort_order ASC, created_at ASC` as any[];
  const existing = rows.map((row) => String(row.slug));

  if (order.length !== existing.length || existing.some((slug) => !order.includes(slug))) {
    throw new Error("Project list changed. Refresh the admin page and try again.");
  }

  for (let index = 0; index < order.length; index += 1) {
    const slug = order[index];
    await sql`
      UPDATE portfolio_projects
      SET sort_order = ${index + 1}, featured = ${index === 0}, updated_at = now()
      WHERE slug = ${slug}
    `;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  for (const slug of order) revalidatePath(`/work/${slug}`);

  return { ok: true };
}

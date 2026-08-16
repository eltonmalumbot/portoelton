"use server";

import { put, del } from "@vercel/blob";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminSession, clearAdminSession, isAdminAuthenticated, verifyAdminPassword } from "../../lib/admin-auth";
import {
  addCertificate,
  addProjectImage,
  deleteCertificate,
  deleteProjectImage,
  getAdminProject,
  updateProfile,
  updateProject,
} from "../../lib/admin-data";
import { neon } from "@neondatabase/serverless";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
}

function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function bool(form: FormData, key: string) {
  return form.get(key) === "on" || form.get(key) === "true";
}

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-");
}

async function uploadImage(file: File, folder: string) {
  if (!file || !file.size) return null;
  if (!ALLOWED_TYPES.has(file.type)) throw new Error("Only JPG, PNG, WebP, GIF, or SVG images are allowed.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image is too large. Maximum size is 8 MB.");

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");

  const blob = await put(`${folder}/${Date.now()}-${safeName(file.name || "image")}`, file, {
    access: "public",
    addRandomSuffix: true,
    token,
  });
  return blob.url;
}

export async function loginAction(formData: FormData) {
  const password = text(formData, "password");
  if (!verifyAdminPassword(password)) redirect("/admin?error=invalid");
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function saveProfileAction(formData: FormData) {
  await requireAdmin();
  let photoUrl = text(formData, "current_photo_url");
  const photo = formData.get("photo") as File | null;
  if (photo?.size) photoUrl = (await uploadImage(photo, "profile")) || photoUrl;

  await updateProfile({
    name: text(formData, "name"),
    headline: text(formData, "headline"),
    bio: text(formData, "bio"),
    photo_url: photoUrl,
    linkedin_url: text(formData, "linkedin_url"),
    github_url: text(formData, "github_url"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    location: text(formData, "location"),
    job_title: text(formData, "job_title"),
    organization_name: text(formData, "organization_name"),
    education_name: text(formData, "education_name"),
  });
  revalidatePath("/");
  redirect("/admin?saved=profile");
}

export async function saveProjectAction(slug: string, formData: FormData) {
  await requireAdmin();
  const existing = await getAdminProject(slug);
  if (!existing) throw new Error("Project not found");

  let coverImageUrl = text(formData, "cover_image_url") || existing.cover_image_url || "";
  const cover = formData.get("cover") as File | null;
  if (cover?.size) coverImageUrl = (await uploadImage(cover, `projects/${slug}`)) || coverImageUrl;

  await updateProject(slug, {
    title: text(formData, "title"),
    eyebrow: text(formData, "eyebrow"),
    subtitle: text(formData, "subtitle"),
    summary: text(formData, "summary"),
    problem: text(formData, "problem"),
    solution: text(formData, "solution"),
    outcome: text(formData, "outcome"),
    status: text(formData, "status"),
    role_items: lines(text(formData, "role_items")),
    feature_items: lines(text(formData, "feature_items")),
    stack_items: lines(text(formData, "stack_items")),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sort_order: Number(text(formData, "sort_order") || existing.sort_order || 0),
    cover_image_url: coverImageUrl,
    live_url: text(formData, "live_url"),
    repo_url: text(formData, "repo_url"),
    repo_private: bool(formData, "repo_private"),
    plugin_note: text(formData, "plugin_note"),
  });

  revalidatePath("/");
  revalidatePath(`/work/${slug}`);
  redirect(`/admin/project/${slug}?saved=1`);
}

export async function addGalleryImageAction(slug: string, formData: FormData) {
  await requireAdmin();
  const file = formData.get("image") as File | null;
  if (!file?.size) redirect(`/admin/project/${slug}?error=no-image`);
  const url = await uploadImage(file, `projects/${slug}/gallery`);
  if (url) await addProjectImage(slug, url, text(formData, "caption"));
  revalidatePath(`/work/${slug}`);
  redirect(`/admin/project/${slug}?saved=gallery`);
}

export async function removeGalleryImageAction(slug: string, id: string, imageUrl: string) {
  await requireAdmin();
  if (imageUrl.includes(".blob.vercel-storage.com")) {
    try { await del(imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN }); } catch {}
  }
  await deleteProjectImage(id);
  revalidatePath(`/work/${slug}`);
  redirect(`/admin/project/${slug}?saved=gallery-delete`);
}

export async function migrateCoverToBlobAction(slug: string) {
  await requireAdmin();
  const project = await getAdminProject(slug);
  if (!project?.cover_image_url || project.cover_image_url.startsWith("http")) redirect(`/admin/project/${slug}?migrated=skip`);

  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  if (!host) throw new Error("Unable to resolve deployment hostname");
  const response = await fetch(`${proto}://${host}${project.cover_image_url}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to fetch current cover image");
  const blobData = await response.blob();
  const ext = project.cover_image_url.split(".").pop() || "svg";
  const file = new File([blobData], `${slug}-cover.${ext}`, { type: blobData.type || "image/svg+xml" });
  const url = await uploadImage(file, `projects/${slug}`);
  if (url) {
    await db()`UPDATE portfolio_projects SET cover_image_url = ${url}, updated_at = now() WHERE slug = ${slug}`;
    await db()`UPDATE portfolio_project_images i SET image_url = ${url} FROM portfolio_projects p WHERE i.project_id = p.id AND p.slug = ${slug} AND i.sort_order = 1`;
  }
  revalidatePath("/");
  revalidatePath(`/work/${slug}`);
  redirect(`/admin/project/${slug}?migrated=1`);
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const slug = text(formData, "slug").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
  const title = text(formData, "title");
  if (!slug || !title) redirect("/admin?error=project-fields");
  const sql = db();
  await sql`
    INSERT INTO portfolio_projects
      (slug, title, eyebrow, subtitle, summary, problem, solution, outcome, status, sort_order, published)
    VALUES
      (${slug}, ${title}, 'Portfolio Project', ${title}, 'Add project summary.', 'Add the problem this project solves.', 'Add your solution.', 'Add project outcome.', 'Draft', COALESCE((SELECT MAX(sort_order) + 1 FROM portfolio_projects), 1), false)
    ON CONFLICT (slug) DO NOTHING
  `;
  revalidatePath("/");
  redirect(`/admin/project/${slug}`);
}

export async function deleteProjectAction(slug: string) {
  await requireAdmin();
  await db()`DELETE FROM portfolio_projects WHERE slug = ${slug}`;
  revalidatePath("/");
  redirect("/admin?saved=project-delete");
}

export async function addCertificateAction(formData: FormData) {
  await requireAdmin();
  let imageUrl = "";
  const image = formData.get("image") as File | null;
  if (image?.size) imageUrl = (await uploadImage(image, "certificates")) || "";
  await addCertificate({
    title: text(formData, "title"),
    issuer: text(formData, "issuer"),
    year_label: text(formData, "year_label"),
    credential_url: text(formData, "credential_url"),
    image_url: imageUrl,
    description: text(formData, "description"),
  });
  revalidatePath("/");
  redirect("/admin?saved=certificate");
}

export async function deleteCertificateAction(id: string, imageUrl?: string) {
  await requireAdmin();
  if (imageUrl?.includes(".blob.vercel-storage.com")) {
    try { await del(imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN }); } catch {}
  }
  await deleteCertificate(id);
  revalidatePath("/");
  redirect("/admin?saved=certificate-delete");
}

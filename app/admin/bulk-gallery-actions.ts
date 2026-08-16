"use server";

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "../../lib/admin-auth";
import { addProjectImage } from "../../lib/admin-data";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_GALLERY_FILES = 24;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
}

function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-");
}

async function uploadImage(file: File, folder: string) {
  if (!file.size) return null;
  if (!ALLOWED_TYPES.has(file.type)) throw new Error(`Unsupported image type: ${file.name}`);
  if (file.size > MAX_IMAGE_BYTES) throw new Error(`${file.name} is larger than 8 MB.`);

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");

  const blob = await put(`${folder}/${Date.now()}-${safeName(file.name || "image")}`, file, {
    access: "public",
    addRandomSuffix: true,
    token,
  });
  return blob.url;
}

export async function addGalleryImagesAction(slug: string, formData: FormData) {
  await requireAdmin();

  const files = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!files.length) redirect(`/admin/project/${slug}?error=no-image`);
  if (files.length > MAX_GALLERY_FILES) redirect(`/admin/project/${slug}?error=too-many-images`);

  const caption = text(formData, "caption");
  let uploaded = 0;

  // Sequential uploads preserve the order selected in the file picker and
  // avoid a burst of simultaneous Blob/database writes.
  for (const file of files) {
    const url = await uploadImage(file, `projects/${slug}/gallery`);
    if (!url) continue;
    await addProjectImage(slug, url, caption);
    uploaded += 1;
  }

  revalidatePath("/");
  revalidatePath(`/work/${slug}`);
  revalidatePath(`/admin/project/${slug}`);
  redirect(`/admin/project/${slug}?saved=gallery&uploaded=${uploaded}`);
}

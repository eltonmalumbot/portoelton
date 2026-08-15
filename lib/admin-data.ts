import { neon } from "@neondatabase/serverless";

function sql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}

export async function getAdminProjects() {
  return await sql()`SELECT * FROM portfolio_projects ORDER BY sort_order ASC, created_at ASC` as any[];
}

export async function getAdminProject(slug: string) {
  const rows = await sql()`SELECT * FROM portfolio_projects WHERE slug = ${slug} LIMIT 1` as any[];
  return rows[0] || null;
}

export async function getAdminProjectImages(slug: string) {
  return await sql()`
    SELECT i.* FROM portfolio_project_images i
    JOIN portfolio_projects p ON p.id = i.project_id
    WHERE p.slug = ${slug}
    ORDER BY i.sort_order ASC, i.created_at ASC
  ` as any[];
}

export async function getAdminCertificates() {
  return await sql()`SELECT * FROM portfolio_certificates ORDER BY sort_order ASC, created_at ASC` as any[];
}

export async function getAdminProfile() {
  const rows = await sql()`SELECT * FROM portfolio_profile ORDER BY updated_at DESC LIMIT 1` as any[];
  return rows[0] || null;
}

export async function updateProfile(input: Record<string, string>) {
  const db = sql();
  const rows = await db`SELECT id FROM portfolio_profile ORDER BY updated_at DESC LIMIT 1` as any[];
  if (!rows[0]) {
    await db`
      INSERT INTO portfolio_profile
      (name, headline, bio, photo_url, linkedin_url, github_url, location, job_title, organization_name, education_name)
      VALUES (${input.name}, ${input.headline}, ${input.bio}, ${input.photo_url || null}, ${input.linkedin_url || null}, ${input.github_url || null}, ${input.location || null}, ${input.job_title || null}, ${input.organization_name || null}, ${input.education_name || null})
    `;
    return;
  }
  await db`
    UPDATE portfolio_profile SET
      name = ${input.name}, headline = ${input.headline}, bio = ${input.bio},
      photo_url = ${input.photo_url || null}, linkedin_url = ${input.linkedin_url || null}, github_url = ${input.github_url || null},
      location = ${input.location || null}, job_title = ${input.job_title || null}, organization_name = ${input.organization_name || null},
      education_name = ${input.education_name || null}, updated_at = now()
    WHERE id = ${rows[0].id}
  `;
}

export async function updateProject(slug: string, input: Record<string, any>) {
  const db = sql();
  await db`
    UPDATE portfolio_projects SET
      title = ${input.title}, eyebrow = ${input.eyebrow}, subtitle = ${input.subtitle}, summary = ${input.summary},
      problem = ${input.problem}, solution = ${input.solution}, outcome = ${input.outcome}, status = ${input.status},
      role_items = ${JSON.stringify(input.role_items)}::jsonb,
      feature_items = ${JSON.stringify(input.feature_items)}::jsonb,
      stack_items = ${JSON.stringify(input.stack_items)}::jsonb,
      featured = ${input.featured}, published = ${input.published}, sort_order = ${input.sort_order},
      cover_image_url = ${input.cover_image_url || null}, live_url = ${input.live_url || null}, repo_url = ${input.repo_url || null},
      repo_private = ${input.repo_private}, plugin_note = ${input.plugin_note || null}, updated_at = now()
    WHERE slug = ${slug}
  `;
}

export async function addProjectImage(slug: string, imageUrl: string, caption: string) {
  const db = sql();
  await db`
    INSERT INTO portfolio_project_images (project_id, image_url, caption, sort_order)
    SELECT id, ${imageUrl}, ${caption || null}, COALESCE((SELECT MAX(i.sort_order) + 1 FROM portfolio_project_images i WHERE i.project_id = p.id), 1)
    FROM portfolio_projects p WHERE p.slug = ${slug}
  `;
}

export async function deleteProjectImage(id: string) {
  await sql()`DELETE FROM portfolio_project_images WHERE id = ${id}`;
}

export async function addCertificate(input: Record<string, string>) {
  const db = sql();
  await db`
    INSERT INTO portfolio_certificates (title, issuer, year_label, credential_url, image_url, description, published, sort_order)
    VALUES (${input.title}, ${input.issuer}, ${input.year_label || null}, ${input.credential_url || null}, ${input.image_url || null}, ${input.description || null}, true,
      COALESCE((SELECT MAX(sort_order) + 1 FROM portfolio_certificates), 1))
  `;
}

export async function deleteCertificate(id: string) {
  await sql()`DELETE FROM portfolio_certificates WHERE id = ${id}`;
}

import { put } from "@vercel/blob";

export async function uploadPortfolioAsset(pathname: string, file: Blob) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob is not connected yet. Add a Blob store to the Vercel project first.");
  }

  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

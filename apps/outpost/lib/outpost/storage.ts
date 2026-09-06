import { createClient } from "@supabase/supabase-js";
export function storage() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  ).storage.from("post-media");
}
export async function mediaUrl(path: string) {
  const { data, error } = await storage().createSignedUrl(path, 3600);
  if (error) throw new Error("Unable to load image");
  return data.signedUrl;
}
export async function mediaData(path: string) {
  const { data, error } = await storage().download(path);
  if (error || !data) throw new Error("Unable to load attachment");
  return { bytes: Buffer.from(await data.arrayBuffer()), mime: data.type };
}

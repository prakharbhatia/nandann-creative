import postgres from "postgres";
let client: ReturnType<typeof postgres> | undefined;
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("Database is not configured");
  return (client ||= postgres(process.env.DATABASE_URL, {
    max: 3,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 10,
  }));
}
export function configured() {
  return !!(
    process.env.DATABASE_URL &&
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.TOKEN_ENCRYPTION_KEY &&
    process.env.ALLOWED_EMAILS &&
    process.env.APP_URL
  );
}
export function preview() {
  return !configured() && process.env.NODE_ENV !== "production";
}

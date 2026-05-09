export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[‑‒–—]/g, '-') // normalize dashes (incl. non-breaking)
    .replace(/&/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

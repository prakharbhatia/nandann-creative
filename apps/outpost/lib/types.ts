export type Platform = "linkedin" | "linkedin-page" | "x";
export type Account = {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  connected: boolean;
  expiresAt?: string;
  commentCapable?: boolean;
};
export type Delivery = {
  id: string;
  accountId: string;
  accountName: string;
  platform: Platform;
  text: string;
  status:
    "draft" | "scheduled" | "publishing" | "published" | "failed" | "unknown";
  error?: string;
  url?: string;
  attempts?: number;
  firstComment?: string;
  comment?: { id: string; text: string; status: string; error?: string };
};
export type Post = {
  id: string;
  kind?: "manual" | "article" | "creative";
  text: string;
  image?: string;
  imagePath?: string;
  scheduledAt: string | null;
  createdAt: string;
  deliveries: Delivery[];
};
export const platformName = (p: Platform) =>
  p === "x"
    ? "X"
    : p === "linkedin-page"
      ? "LinkedIn page"
      : "LinkedIn profile";

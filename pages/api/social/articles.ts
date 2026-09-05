import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../../data/blogPosts";
import { createArticleManifest } from "../../../lib/social/article-manifest";

/** Outpost reads this on the production domain, so local builds never schedule posts. */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  res.setHeader("Cache-Control", "no-store");
  try {
    return res.status(200).json(createArticleManifest(getAllPosts()));
  } catch {
    return res.status(500).json({ error: "Article manifest is unavailable" });
  }
}

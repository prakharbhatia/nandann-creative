import { timingSafeEqual } from "node:crypto";
export function validApiKey(
  authorization: string | null,
  secret: string | undefined,
) {
  if (!secret || secret.length < 32) return false;
  const expected = Buffer.from("Bearer " + secret);
  const actual = Buffer.from(authorization || "");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

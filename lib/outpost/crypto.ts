import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
function key() {
  const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY || "", "base64");
  if (key.length !== 32)
    throw new Error(
      "TOKEN_ENCRYPTION_KEY must be 32 random bytes encoded as base64",
    );
  return key;
}
export function seal(value: string) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([c.update(value, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), data]
    .map((v) => v.toString("base64url"))
    .join(".");
}
export function unseal(value: string) {
  const [iv, tag, data] = value
    .split(".")
    .map((v) => Buffer.from(v, "base64url"));
  const c = createDecipheriv("aes-256-gcm", key(), iv);
  c.setAuthTag(tag);
  return Buffer.concat([c.update(data), c.final()]).toString("utf8");
}

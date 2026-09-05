import { db } from "./db";
import { defaultSettings, settingsSchema } from "./settings";
export async function readSettings() {
  const [row] = await db()`select value from publishing_settings where id=1`;
  return settingsSchema.parse(
    row?.value || {
      ...defaultSettings,
      timeZone: process.env.ARTICLE_TIME_ZONE || defaultSettings.timeZone,
    },
  );
}

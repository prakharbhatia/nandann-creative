import { z } from "zod";
export const timeValue = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
export const settingsSchema = z
  .object({
    timeZone: z.string().refine((value) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: value });
        return true;
      } catch {
        return false;
      }
    }, "Choose a valid IANA time zone."),
    articleTime: timeValue,
    articleEnabled: z.boolean(),
    creativeEnabled: z.boolean(),
    creativeTimes: z.tuple([timeValue, timeValue]),
  })
  .refine(
    (v) => new Set([v.articleTime, ...v.creativeTimes]).size === 3,
    "Choose different times for the article and both image posts.",
  );
export type PublishingSettings = z.infer<typeof settingsSchema>;
export const defaultSettings: PublishingSettings = {
  timeZone: "Asia/Kolkata",
  articleTime: "18:00",
  articleEnabled: true,
  creativeEnabled: true,
  creativeTimes: ["10:00", "16:00"],
};

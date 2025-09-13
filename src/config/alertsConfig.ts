import { z } from "zod";

export const AlertSchema = z.object({
  description: z.string(),
  effectiveFrom: z.string(),
  effectiveTo: z.string().nullable().optional(),
  id: z.string(),
  lastUpdated: z.string().optional(),
  link: z.string().nullable().optional(),
  severity: z.enum(["emergency", "notice"]),
  tags: z.array(z.string()).optional(),
  title: z.string(),
});

export const AlertsSchema = z.array(AlertSchema);
export type Alert = z.infer<typeof AlertSchema>;

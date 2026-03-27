import { z } from "zod";

export const DocumentItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  date: z.string(), // ISO string for sorting
  category: z.enum(["Forms", "Minutes", "Notices", "Other", "Reports"]),
});

export const DocumentsSchema = z.object({
  items: z.array(DocumentItemSchema),
});

export type DocumentItem = z.infer<typeof DocumentItemSchema>;
export type DocumentsConfig = z.infer<typeof DocumentsSchema>;

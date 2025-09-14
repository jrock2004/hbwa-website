import { z } from "zod";

export const LinkItemSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

export const LinkGroupSchema = z.object({
  label: z.string().min(1),
  items: z.array(LinkItemSchema).min(1),
});

export const LinksSchema = z.object({
  title: z.string().default("Helpful Links"),
  groups: z.array(LinkGroupSchema).min(1),
});

export type LinkItem = z.infer<typeof LinkItemSchema>;
export type LinkGroup = z.infer<typeof LinkGroupSchema>;
export type Links = z.infer<typeof LinksSchema>;

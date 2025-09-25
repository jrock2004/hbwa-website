import { email, z } from "zod";

export const LinkItem = z.object({
  label: z.string(),
  to: z.string(),
});

export const CTAItem = LinkItem.extend({
  variant: z.enum(["primary", "ghost", "outline"]).default("primary"),
});

export const SiteConfigSchema = z.object({
  about: z.object({
    left: z.array(z.string()).default([]),
    right: z.array(z.string()).default([]),
  }),
  ccr: z.object({
    title: z.string(),
    primary: LinkItem,
    secondary: LinkItem,
  }),
  contact: z.object({
    email: email().optional(),
    phone: z.string(),
    paOneCallUrl: z.string().url(),
    address: z.object({
      buildingName: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      poBox: z.string().optional(),
    }),
  }),
  hero: z.object({
    title: z.string(),
    tagline: z.string(),
    ctas: z.array(CTAItem).min(1),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
  notices: z
    .array(
      z.object({
        title: z.string(),
        date: z.string(), // ISO or MM/DD/YYYY; keep simple for non-devs
        to: z.string(),
      }),
    )
    .default([]),
  quickLinks: z.array(LinkItem).default([]),
  siteTitle: z.string().default("Honey Brook Brough Authority"),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

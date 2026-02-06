import { z } from "zod";

export const RouteMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(),
  noindex: z.boolean().optional(),
});

export const MetaConfigSchema = z.object({
  defaults: z.object({
    siteName: z.string(),
    titleTemplate: z.string(),
    description: z.string(),
    locale: z.string().default("en_US"),
    twitterCard: z.enum(["summary", "summary_large_image"]).default("summary_large_image"),
    ogImage: z.string().optional(),
    twitterSite: z.string().nullable().optional(),
    baseUrl: z.string().url().nullable().optional(),
  }),
  routes: z.record(z.string(), RouteMetaSchema),
});

export type MetaConfig = z.infer<typeof MetaConfigSchema>;
export type RouteMeta = z.infer<typeof RouteMetaSchema>;

let cached: MetaConfig | null = null;

export async function loadMetaConfig(): Promise<MetaConfig> {
  if (cached) return cached;
  const res = await fetch("/meta.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load meta.json: ${res.status}`);
  const data = await res.json();
  cached = MetaConfigSchema.parse(data);
  return cached;
}

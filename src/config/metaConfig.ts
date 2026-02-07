import { SiteConfigSchema } from "./siteConfig";

export type MetaConfig = {
  defaults: {
    siteName: string;
    titleTemplate: string;
    description: string;
    locale: string;
    twitterCard: "summary" | "summary_large_image";
    ogImage?: string;
    twitterSite?: string | null;
    baseUrl?: string | null;
  };
  routes: Record<
    string,
    {
      title: string;
      description: string;
      ogImage?: string;
      noindex?: boolean;
    }
  >;
};

export type RouteMeta = {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
};

let cached: MetaConfig | null = null;

export async function loadMetaConfig(): Promise<MetaConfig> {
  if (cached) return cached;
  const res = await fetch("/site.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load site.json: ${res.status}`);
  const data = await res.json();
  const parsed = SiteConfigSchema.parse(data);
  cached = parsed.meta;
  return cached;
}

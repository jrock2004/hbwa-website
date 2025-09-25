import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadMetaConfig, type MetaConfig, type RouteMeta } from "@/config/metaConfig";

const FALLBACK = {
  siteName: "Honey Brook Water Authority",
  titleTemplate: "%s | Honey Brook Water Authority",
  description:
    "Safe, reliable municipal water service for Honey Brook and surrounding communities. View service alerts, billing, and public documents.",
  locale: "en_US",
  twitterCard: "summary_large_image" as const,
  ogImage: undefined as string | undefined,
  twitterSite: null as string | null,
  baseUrl: null as string | null,
};

function pickRouteMeta(pathname: string, config: MetaConfig | null): RouteMeta | undefined {
  if (!config) return undefined;

  if (config.routes[pathname]) return config.routes[pathname];

  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const keys = Object.keys(config.routes)
    .filter((k) => k !== "/*")
    .sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (key === "/") continue;
    if (normalized === key) return config.routes[key];
    if (normalized.startsWith(key + "/")) return config.routes[key];
  }
  return config.routes["/*"];
}

function setTitle(text: string) {
  document.title = text;
}

function upsertMetaByName(name: string, content?: string) {
  if (!content) return;

  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);

    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}
function upsertMetaByProp(prop: string, content?: string) {
  if (!content) return;

  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", prop);

    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}
function upsertLinkRel(rel: string, href?: string) {
  if (!href) return;

  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);

    document.head.appendChild(el);
  }

  el.setAttribute("href", href);
}

export default function Seo() {
  const { pathname } = useLocation();
  const [config, setConfig] = useState<MetaConfig | null>(null);

  useEffect(() => {
    loadMetaConfig()
      .then(setConfig)
      .catch((e) => {
        console.error("Failed to load meta.json", e);

        setConfig(null);
      });
  }, []);

  const computed = useMemo(() => {
    const d = config?.defaults ?? FALLBACK;
    const rm = pickRouteMeta(pathname, config);
    const title = (d.titleTemplate || "%s").replace("%s", rm?.title ?? "Home");
    const description = rm?.description ?? d.description;
    const ogImage = rm?.ogImage ?? d.ogImage;
    const noindex = !!rm?.noindex;

    const canonical = d.baseUrl
      ? new URL(pathname, d.baseUrl).toString()
      : typeof window !== "undefined"
        ? window.location.origin + pathname
        : undefined;

    return { d, title, description, ogImage, noindex, canonical };
  }, [config, pathname]);

  useEffect(() => {
    setTitle(computed.title);

    upsertMetaByName("description", computed.description);
    upsertMetaByName("robots", computed.noindex ? "noindex,nofollow" : "index,follow");

    if (computed.canonical) upsertLinkRel("canonical", computed.canonical);

    upsertMetaByProp("og:type", "website");
    upsertMetaByProp("og:site_name", computed.d.siteName);
    upsertMetaByProp("og:locale", computed.d.locale);
    upsertMetaByProp("og:title", computed.title);
    upsertMetaByProp("og:description", computed.description);

    if (computed.ogImage) upsertMetaByProp("og:image", computed.ogImage);

    upsertMetaByName("twitter:card", computed.d.twitterCard);

    if (computed.d.twitterSite) upsertMetaByName("twitter:site", computed.d.twitterSite);

    upsertMetaByName("twitter:title", computed.title);
    upsertMetaByName("twitter:description", computed.description);

    if (computed.ogImage) upsertMetaByName("twitter:image", computed.ogImage);
  }, [computed]);

  return null;
}

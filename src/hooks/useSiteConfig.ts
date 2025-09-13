import { useEffect, useState } from "react";
import { SiteConfigSchema, type SiteConfig } from "@/config/siteConfig";

export function useSiteConfig() {
  const [data, setData] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/site.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const parsed = SiteConfigSchema.safeParse(json);
        if (!parsed.success) {
          setError("Config error: please check site.json (fields or commas).");
          return;
        }
        setData(parsed.data);
      })
      .catch(() => setError("Could not load site.json"));
  }, []);

  return { data, error, isLoading: !data && !error };
}

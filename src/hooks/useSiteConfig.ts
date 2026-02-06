import { SiteConfigSchema, type SiteConfig } from "@/config/siteConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useSiteConfig(): {
  data: SiteConfig | null;
  error: string | null;
  isLoading: boolean;
} {
  const state = useJsonConfig("/site.json", SiteConfigSchema);
  return {
    data: state.status === "success" ? state.data : null,
    error: state.status === "error" ? state.error.message : null,
    isLoading: state.status === "idle" || state.status === "loading",
  };
}

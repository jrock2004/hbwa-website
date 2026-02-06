import { LinksSchema } from "@/config/linksConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useLinks() {
  return useJsonConfig("/links.json", LinksSchema);
}

import { RatesConfigSchema, RATES_CONFIG_PATH } from "@/config/ratesConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useRates() {
  return useJsonConfig(RATES_CONFIG_PATH, RatesConfigSchema);
}

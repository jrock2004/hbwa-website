import { GovernanceConfigSchema, GOVERNANCE_CONFIG_PATH } from "@/config/governanceConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useGovernance() {
  return useJsonConfig(GOVERNANCE_CONFIG_PATH, GovernanceConfigSchema);
}

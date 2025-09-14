import { z } from "zod";

export const GovernanceSchema = z.object({
  board: z.array(
    z.object({
      role: z.string(),
      name: z.string(),
    }),
  ),
  employees: z.array(
    z.object({
      role: z.string(),
      name: z.string(),
    }),
  ),
  consultants: z.array(
    z.object({
      role: z.string(),
      name: z.string(),
    }),
  ),
  memberships: z.array(z.string()),
});

export type Governance = z.infer<typeof GovernanceSchema>;
export const GOVERNANCE_CONFIG_PATH = "/governance.json"; // served from /public
export const GovernanceConfigSchema = GovernanceSchema;
export type GovernanceConfig = z.infer<typeof GovernanceConfigSchema>;

import { z } from "zod";

export const FeeSchema = z.object({
  label: z.string(),
  amountUSD: z.number().optional(), // numeric USD for easy formatting
  amountText: z.string().optional(), // when it's “Actual cost + …” etc.
  unit: z.enum(["per_hour", "per_page", "per_document", "per_EDU_per_quarter"]).optional(),
  details: z.string().optional(),
  noteKey: z.string().optional(),
});

export const SectionSchema = z.object({
  key: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  fees: z.array(FeeSchema).default([]),
  subsections: z
    .array(
      z.object({
        key: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        fees: z.array(FeeSchema).default([]),
      }),
    )
    .optional(),
  policies: z.array(z.string()).optional(),
  links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
});

export const RatesConfigSchema = z.object({
  title: z.string(),
  effectiveDate: z.string(), // ISO date
  sections: z.array(SectionSchema),
  notes: z.record(z.string(), z.string()).default({}),
});

export type RatesConfig = z.infer<typeof RatesConfigSchema>;
export type RatesSection = z.infer<typeof SectionSchema>;
export type RateFee = z.infer<typeof FeeSchema>;

export const RATES_CONFIG_PATH = "/rates.json"; // served from /public

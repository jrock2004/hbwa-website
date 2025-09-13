import { z } from "zod";

export const ReportSchema = z.object({
  year: z.number(),
  url: z.string(),
  size: z.string().optional(),
  note: z.string().optional(),
});

export type Report = z.infer<typeof ReportSchema>;

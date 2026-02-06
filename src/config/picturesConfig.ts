import { z } from "zod";

export const PictureSchema = z.object({
  src: z.string(),
  alt: z.string(),
  title: z.string().optional(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const PicturesConfigSchema = z.object({
  items: z.array(PictureSchema),
});

export type Picture = z.infer<typeof PictureSchema>;
export type PicturesConfig = z.infer<typeof PicturesConfigSchema>;

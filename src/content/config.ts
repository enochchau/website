import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    schema: z.object({
      draft: z.boolean().optional(),
      title: z.string(),
      date: z.string(),
      subtitle: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};

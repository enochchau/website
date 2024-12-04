import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    date: z.string(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };

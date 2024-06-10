import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import { rehypePreview } from "./rehype-preview";
import { remarkReadingTime } from "./remark-reading-time";
const site = "https://enochchau.com";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    solid(),
    sitemap({
      filter: (page) => {
        return ![
          "/blog/dev/",
          "/create/",
          "/create/collect/",
          "/create/sound/",
          "/create/visual/",
          "/links/",
          "/organic_color_picker/",
        ].some((p) => site + p === page);
      },
    }),
    tailwind(),
  ],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypePreview],
  },
  site,
});

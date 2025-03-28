import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { rehypePreview } from "./rehype-preview";
import { remarkReadingTime } from "./remark-reading-time";
const site = "https://enochchau.com";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    solid({
      include: "**/components/**",
    }),
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
    react({ include: "**/react/**" }),
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
  vite: {
    plugins: [tailwindcss()],
  },
});

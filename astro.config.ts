import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import { remarkReadingTime } from "./remark-reading-time";
const site = "https://enochchau.com";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    solid({
      devtools: true,
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
    processor: unified({
      gfm: true,
      remarkPlugins: [remarkReadingTime],
    }),
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  site,
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
});

import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import getReadingTime from "reading-time";
import { defineMdastPlugin } from "satteri";

const readingTimePlugin = defineMdastPlugin({
  name: "reading-time",
  text(node, ctx) {
    if (!ctx.data.astro?.frontmatter.readingTime) {
      ctx.data.astro!.frontmatter.readingTime = getReadingTime(
        node.value,
      ).minutes;
    } else {
      ctx.data.astro!.frontmatter.readingTime += getReadingTime(
        node.value,
      ).minutes;
    }
  },
});

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
    react({ include: "**/react/**/*.tsx" }),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [readingTimePlugin],
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

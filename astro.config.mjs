import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import { remarkReadingTime } from "./remark-reading-time.mjs";
const remarkPlugins = [remarkReadingTime];

// https://astro.build/config
export default defineConfig({
  integrations: [
    image(),
    mdx(),
    solid(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins,
  },
  site: "https://enochchau.com",
});

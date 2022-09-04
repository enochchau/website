import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
const remarkPlugins = [remarkReadingTime];

// https://astro.build/config
export default defineConfig({
  integrations: [
    image(),
    mdx({
      remarkPlugins,
    }),
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

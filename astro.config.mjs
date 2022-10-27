import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import { remarkReadingTime } from "./remark-reading-time.mjs";
import { rehypePreview } from './rehype-preview.mjs'

const remarkPlugins = [remarkReadingTime];

// https://astro.build/config
export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    solid(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins,
    rehypePlugins: [rehypePreview]
  },
  site: "https://enochchau.com",
});

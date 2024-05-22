import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import { rehypePreview } from "./rehype-preview.mjs";
import { remarkReadingTime } from "./remark-reading-time.mjs";


// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solid()],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypePreview],
  },
  site: "https://enochchau.com",
  redirects: {
    '/dev': '/blog?f=dev'
  },
  image: {
    service: {
      entrypoint: './sharpService.mjs',
      config: {
        path: '/blog/', 
        defaults: {
          width: 800,
          format: 'webp'
        }
      }
    }
  },
});

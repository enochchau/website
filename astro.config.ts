import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";

import { rehypePreview } from "./rehype-preview";
import { remarkReadingTime } from "./remark-reading-time";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solid()],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "one-dark-pro",
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypePreview, rehypeDataBlog],
  },
  site: "https://enochchau.com",
  image: {
    service: {
      entrypoint: "./sharpService.ts",
      config: {
        tag: "data-blog",
        defaults: {
          width: 800,
          format: "webp",
        },
      },
    },
  },
});

/**
 * Use rehype to insert `[data-blog="true"]` attribute on `<img />` nodes.
 * The custom image service uses this to apply default transforms.
 */
function rehypeDataBlog() {
  return function (tree: any, file: any) {
    if (file.history[0].includes("content/blog")) {
      visit(tree, "element", (node) => {
        if (node.tagName === "img") {
          node.properties = { ...node.properties, ["data-blog"]: true };
        }
      });
    }
  };
}

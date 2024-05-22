import { toHtml } from "hast-util-to-html";

export function rehypePreview() {
  return function (tree, file) {
    file.data.astro.frontmatter.preview = toHtml(
      tree.children.filter((node) => !/^mdx/.test(node.type)),
    );
  };
}

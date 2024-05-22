import { getCollection } from "astro:content";

export async function getBlogEntries() {
  return getCollection("blog", ({ data }) => data.draft !== true);
}


import { getCollection } from "astro:content";

export async function getBlogEntries() {
  return await getCollection(
    "blog",
    ({ data }) => data.draft !== true,
  );
}

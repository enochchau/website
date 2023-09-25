import type { RSSOptions } from "@astrojs/rss";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get = async () => {
  const blogEntries = await getCollection(
    "blog",
    ({ data }) => data.draft !== true,
  );

  const items: RSSOptions["items"] = [];

  for (const entry of blogEntries) {
    const rendered = await entry.render();

    items.push({
      link: `/${entry.collection}/${entry.slug}`,
      title: entry.data.title,
      pubDate: new Date(entry.data.date),
      description: rendered.remarkPluginFrontmatter?.preview,
    });
  }

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Enoch's Blog",
    description: "Conversations on humans and computers",
    site: import.meta.env.SITE,
    items,
  });
};

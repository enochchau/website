import type { RSSOptions } from "@astrojs/rss";
import rss from "@astrojs/rss";
import { render } from "astro:content";

import { getBlogEntries } from "../util/getBlogEntries";

export const GET = async () => {
  const blogEntries = await getBlogEntries();

  const items: RSSOptions["items"] = [];

  for (const entry of blogEntries) {
    const rendered = await render(entry);

    items.push({
      link: `/${entry.collection}/${entry.id}`,
      title: entry.data.title,
      pubDate: new Date(entry.data.date),
      description: rendered.remarkPluginFrontmatter?.preview,
    });
  }

  items.sort(
    (a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0),
  );

  return rss({
    title: "Enoch's Blog",
    description: "Conversations on humans and computers",
    site: import.meta.env.SITE,
    items,
  });
};

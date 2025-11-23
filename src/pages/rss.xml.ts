import mdxRenderer from "@astrojs/mdx/server.js";
import reactRenderer from "@astrojs/react/server.js";
import type { RSSFeedItem } from "@astrojs/rss";
import rss from "@astrojs/rss";
import { experimental_AstroContainer } from "astro/container";
import { render } from "astro:content";

import { getBlogEntries } from "../util/getBlogEntries";

export const GET = async () => {
  const container = await experimental_AstroContainer.create();
  container.addServerRenderer({ renderer: mdxRenderer });
  container.addServerRenderer({ renderer: reactRenderer });

  const blogEntries = await getBlogEntries();

  const items = await Promise.all(
    blogEntries.map(async (entry): Promise<RSSFeedItem> => {
      const rendered = await render(entry);

      const html = await container.renderToString(rendered.Content);

      return {
        link: `/${entry.collection}/${entry.id}`,
        title: entry.data.title,
        pubDate: new Date(entry.data.date),
        description: html,
      };
    }),
  );

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

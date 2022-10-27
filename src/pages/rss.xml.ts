import rss from "@astrojs/rss";

const postImportResult = import.meta.glob("./blog/**/*.mdx", { eager: true });
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: "Enoch's Blog",
    description: "Conversations on humans and computers",
    site: import.meta.env.SITE,
    items: posts
      .map((post) => ({
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.date,
        description: post.frontmatter.preview,
      }))
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      ),
  });

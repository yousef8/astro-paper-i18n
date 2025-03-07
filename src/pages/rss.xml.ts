import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import getRelativePath from "@utils/getRelativePath";
import { translateFor } from "@i18n/utils";

const t = translateFor("en");

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: t("site.title"),
    description: t("site.desc"),
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => ({
      link: getRelativePath(`posts/${slug}/`),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}

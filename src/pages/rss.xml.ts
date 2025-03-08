import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import {
  getRelativeLocalePath,
  parseLocaleFromUrlOrPath,
  translateFor,
} from "@i18n/utils";
import type { APIContext } from "astro";
import { DEFAULT_LOCALE } from "@i18n/config";

export async function GET(context: APIContext) {
  const localeKey =
    parseLocaleFromUrlOrPath(context.url.href) ?? DEFAULT_LOCALE;

  const t = translateFor(localeKey);

  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: t("site.title"),
    description: t("site.desc"),
    site: new URL(getRelativeLocalePath(localeKey), SITE.website).href,
    items: sortedPosts.map(({ data, slug }) => ({
      link: getRelativeLocalePath(localeKey, `/posts/${slug}/`),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}

import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import { getLocaleInfo, parseLocaleFromUrlOrPath } from "@i18n/utils";
import { DEFAULT_LOCALE } from "@i18n/config";

export async function getStaticPaths() {
  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props, request }) => {
  const localeKey = parseLocaleFromUrlOrPath(request.url) ?? DEFAULT_LOCALE;

  return new Response(
    await generateOgImageForPost(
      props as CollectionEntry<"blog">,
      localeKey,
      getLocaleInfo(localeKey)
    ),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};

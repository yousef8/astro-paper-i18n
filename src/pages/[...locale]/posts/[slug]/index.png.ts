import type { APIRoute, InferGetStaticParamsType } from "astro";
import { type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import { getLocaleInfo } from "@i18n/utils";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@i18n/config";
import { getPostsGroupedByLocale } from "@utils/posts";

export async function getStaticPaths() {
  const postsByLocale = await getPostsGroupedByLocale({
    draft: false,
    allowedLocales: SUPPORTED_LOCALES,
  });

  const paths = SUPPORTED_LOCALES.flatMap(locale => {
    const posts = postsByLocale[locale] || [];

    const postsWithoutOgImage = posts.filter(({ data }) => !data.ogImage);

    return postsWithoutOgImage.map(post => ({
      params: {
        locale: locale === DEFAULT_LOCALE ? undefined : locale,
        slug: slugifyStr(post.data.title),
      },
      props: post,
    }));
  });

  return paths;
}

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ params, props }) => {
  const { locale = DEFAULT_LOCALE } = params as Params;

  return new Response(
    await generateOgImageForPost(
      props as CollectionEntry<"blog">,
      locale,
      getLocaleInfo(locale)
    ),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};

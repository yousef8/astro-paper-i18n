import type { APIRoute, InferGetStaticParamsType } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";
import { getLocaleInfo } from "@/i18n/utils";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export async function getStaticPaths() {
  return SUPPORTED_LOCALES.map(locale => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
  }));
}

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ params }) => {
  const { locale: localeKey = DEFAULT_LOCALE } = params as Params;

  return new Response(
    await generateOgImageForSite(localeKey, getLocaleInfo(localeKey)),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};

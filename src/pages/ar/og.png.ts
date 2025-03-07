import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";
import { getLocaleInfo, parseLocaleFromUrlOrPath } from "@i18n/utils";
import { DEFAULT_LOCALE } from "@i18n/config";

export const GET: APIRoute = async ({ request }) => {
  const localeKey = parseLocaleFromUrlOrPath(request.url) ?? DEFAULT_LOCALE;

  return new Response(
    await generateOgImageForSite(localeKey, getLocaleInfo(localeKey)),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};

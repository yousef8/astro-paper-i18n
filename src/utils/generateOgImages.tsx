import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import type { LocaleProfile, SupportedLocales } from "@i18n/config";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(
  post: CollectionEntry<"blog">,
  localeKey: SupportedLocales[number],
  localeConfig: LocaleProfile
) {
  const svg = await postOgImage(post, localeKey, localeConfig);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite(
  localKey: SupportedLocales[number],
  localeConfig: LocaleProfile
) {
  const svg = await siteOgImage(localKey, localeConfig);
  return svgBufferToPngBuffer(svg);
}

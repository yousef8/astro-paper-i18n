import { UnsupportedLocale } from "@i18n/errors";
import { type GetLocaleOptions, getRelativeLocaleUrl } from "astro:i18n";
import {
  type LocaleKey,
  type LocaleProfile,
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "@i18n/config";
import type { I18nKeys } from "@i18n/types";

// TODO: Convert all to pure functions

export function translateFor(locale: string | undefined) {
  // TODO: typescript support for placeholders like for ('tag.desc', {name: ''})
  // TODO: should throw an error in case locale key not supported
  locale = locale ?? DEFAULT_LOCALE;
  return (key: I18nKeys, substitutions?: Record<string, string | number>) => {
    let translation = localeToProfile[locale as LocaleKey].messages[key];

    for (const key in substitutions) {
      const value = substitutions[key];
      translation = translation.replace(`{${key}}`, String(value));
    }

    return translation;
  };
}

export function isLocaleKey(locale: string | undefined): locale is LocaleKey {
  if (typeof locale !== "string") return false;
  return SUPPORTED_LOCALES.includes(locale as LocaleKey);
}

export function isValidLocaleKey(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale as LocaleKey);
}

export function getLocaleInfo(locale?: string): LocaleProfile {
  // TODO: rename to getLocaleConfig
  // TODO: throw an error instead of default locale
  return isLocaleKey(locale)
    ? localeToProfile[locale]
    : localeToProfile[DEFAULT_LOCALE];
}

export function isPathLocalized(path: string): boolean {
  // TODO: refactor extractingthe locale part from path
  const possibleLocalKeyInPath = path.replace(/^\/+/, "").split("/")[0];
  return isValidLocaleKey(possibleLocalKeyInPath);
}

export function getRelativeLocalePath(
  locale: string | undefined,
  path: string = "/",
  options?: GetLocaleOptions
): string {
  if (!isLocaleKey(locale)) throw new UnsupportedLocale(locale);

  const localizedPath = getRelativeLocaleUrl(locale, path, options);

  const hasTrailingSlash = path.endsWith("/") || localizedPath === "/";

  if (hasTrailingSlash) return localizedPath;

  return localizedPath.replace(/\/+$/, "");
}

export function stripBaseAndLocale(locale: string | undefined, path: string) {
  if (!isLocaleKey(locale)) throw new UnsupportedLocale(locale);

  const prefix = buildPrefix(locale);

  // TODO: for default locale it shouldn't remove leading slash
  // TODO: it should handle if path doesn't have a leading slash
  return path.slice(prefix.length);
}

function buildPrefix(locale: LocaleKey) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    baseUrl +
    (baseUrl.endsWith("/") ? "" : "/") +
    (locale === DEFAULT_LOCALE ? "" : locale)
  );
}

/**
 * Extracts and returns the locale from a given URL or path.
 * The function removes the base URL (if present) and checks if the first segment
 * of the remaining path is a valid locale key.
 *
 * @param {string} urlOrPath - The full URL or path from which to extract the locale.
 *                             Example: `https://example.com/en/posts/1` or `/en/posts/1`.
 * @returns {LocaleKey | undefined} - The extracted locale key if valid,
 *                                                   otherwise `undefined`.
 * @example
 * // Returns 'en'
 * parseLocaleFromUrlOrPath('https://example.com/en/posts/1');
 *
 * // Returns 'ar'
 * parseLocaleFromUrlOrPath('/ar/posts/2');
 *
 * // Returns undefined (if the first segment is not a valid locale key)
 * parseLocaleFromUrlOrPath('/posts/1');
 */
export function parseLocaleFromUrlOrPath(
  urlOrPath: string
): LocaleKey | undefined {
  const url = new URL(urlOrPath, "http://astro-paper-i18n.com");
  const baseUrl = import.meta.env.BASE_URL;

  const pathWithoutBase = url.pathname.slice(baseUrl.length);

  const possiblelocalkey = pathWithoutBase
    .replaceAll(/^\/+|\/+$/g, "")
    .split("/")[0];

  if (isLocaleKey(possiblelocalkey)) {
    return possiblelocalkey;
  }
}

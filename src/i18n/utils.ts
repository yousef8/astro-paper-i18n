import { type GetLocaleOptions, getRelativeLocaleUrl } from "astro:i18n";
import {
  type LocaleProfile,
  type SupportedLocales,
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "./config";
import type { I18nKeys } from "./types";

// TODO: Convert all to pure functions

export function translateFor(locale: string | undefined) {
  // TODO: typescript support for placeholders like for ('tag.desc', {name: ''})
  // TODO: should throw an error in case locale key not supported
  locale = locale ?? DEFAULT_LOCALE;
  return (key: I18nKeys, substitutions?: Record<string, string | number>) => {
    let translation =
      localeToProfile[locale as SupportedLocales[number]].messages[key];

    for (const key in substitutions) {
      const value = substitutions[key];
      translation = translation.replace(`{${key}}`, String(value));
    }

    return translation;
  };
}

export function isLocaleKey(
  locale: string
): locale is SupportedLocales[number] {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocales[number]);
}

export function isValidLocaleKey(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocales[number]);
}

export function getLocaleInfo(locale?: string): LocaleProfile {
  // TODO: rename to getLocaleConfig
  // TODO: throw an error instead of default locale
  return locale && isLocaleKey(locale)
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
  const localeKey = resolveLocale(locale);

  const localizedPath = getRelativeLocaleUrl(localeKey, path, options);

  const hasTrailingSlash = path.endsWith("/") || localizedPath === "/";

  if (hasTrailingSlash) return localizedPath;

  return localizedPath.replace(/\/+$/, "");
}

export function resolveLocale(
  locale: string | undefined
): SupportedLocales[number] {
  // TODO: get rid off that function and create only 1 custom error class,
  // no need for 2 error class just for different locale values. - What was i thinking -
  if (!locale) {
    throw new Error("locale key is undefined");
  }

  if (!isLocaleKey(locale)) {
    throw new Error(
      `'${locale}' locale is not supported, add it to i18n/config or choose a supported locale`
    );
  }

  return locale;
}

export function stripBaseAndLocale(locale: string | undefined, path: string) {
  const localeKey = resolveLocale(locale);

  const prefix = buildPrefix(localeKey);

  // TODO: for default locale it shouldn't remove leading slash
  // TODO: it should handle if path doesn't have a leading slash
  return path.slice(prefix.length);
}

function buildPrefix(locale: SupportedLocales[number]) {
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
 * @returns {SupportedLocales[number] | undefined} - The extracted locale key if valid,
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
): SupportedLocales[number] | undefined {
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

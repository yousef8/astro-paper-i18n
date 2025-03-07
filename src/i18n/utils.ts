import { type GetLocaleOptions, getRelativeLocaleUrl } from "astro:i18n";
import {
  type LocaleProfile,
  type SupportedLocales,
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "./config";
import type { I18nKeys } from "./types";

export function translateFor(locale: string | undefined) {
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

function isLocaleKey(locale: string): locale is SupportedLocales[number] {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocales[number]);
}

export function isValidLocaleKey(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocales[number]);
}

export function getLocaleInfo(locale?: string): LocaleProfile {
  return locale && isLocaleKey(locale)
    ? localeToProfile[locale]
    : localeToProfile[DEFAULT_LOCALE];
}

export function isPathLocalized(path: string): boolean {
  const possibleLocalKeyInPath = path.split("/").splice(1)[0];
  return isValidLocaleKey(possibleLocalKeyInPath);
}

export function getRelativeLocalePath(
  locale: string | undefined,
  path?: string,
  options?: GetLocaleOptions
): string {
  const localeKey = resolveLocale(locale);

  return getRelativeLocaleUrl(localeKey, path, options);
}

function resolveLocale(locale: string | undefined): SupportedLocales[number] {
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

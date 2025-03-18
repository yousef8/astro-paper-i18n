import { UnsupportedLocale } from "@i18n/errors";
import { type GetLocaleOptions, getRelativeLocaleUrl } from "astro:i18n";
import {
  type LocaleKey,
  type LocaleProfile,
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "@i18n/config";
import type { I18nKeys, I18nStrings } from "@i18n/types";

// TODO: Convert all to pure functions

export function translateFor(
  locale: string | undefined,
  _isLocaleKey: (
    locale: string | undefined
  ) => locale is LocaleKey = isLocaleKey,
  _getLocaleMsgs: (locale: LocaleKey) => I18nStrings = getLocaleMsgs
) {
  if (!_isLocaleKey(locale)) throw new UnsupportedLocale(locale);
  const msgs = _getLocaleMsgs(locale);

  return (key: I18nKeys, substitutions?: Record<string, string | number>) => {
    let translation = msgs[key];

    for (const key in substitutions) {
      const value = substitutions[key];
      translation = translation.replace(`{${key}}`, String(value));
    }

    return translation;
  };
}

function getLocaleMsgs(
  locale: LocaleKey,
  getLocaleConfig: (locale: LocaleKey) => LocaleProfile = getLocaleInfo
): I18nStrings {
  return getLocaleConfig(locale).messages;
}

export function isLocaleKey(locale: string | undefined): locale is LocaleKey {
  if (typeof locale !== "string") return false;
  return SUPPORTED_LOCALES.includes(locale as LocaleKey);
}

export function getLocaleInfo(
  locale?: string,
  _isLocaleKey: (locale?: string) => locale is LocaleKey = isLocaleKey
): LocaleProfile {
  if (!_isLocaleKey(locale)) throw new UnsupportedLocale(locale);

  return localeToProfile[locale];
}

export function getRelativeLocalePath(
  locale: string | undefined,
  path: string = "/",
  {
    _isLocaleKey = isLocaleKey,
    ...options
  }: GetLocaleOptions & {
    _isLocaleKey?: (locale?: string) => locale is LocaleKey;
  } = {}
): string {
  if (!_isLocaleKey(locale)) throw new UnsupportedLocale(locale);

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

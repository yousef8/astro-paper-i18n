import type { I18nStrings } from "./types";
import ARLocale from "./locales/ar";
import ENLocale from "./locales/en";
import CNLocale from "./locales/zh";

export type LocaleProfile = {
  name: string;
  messages: I18nStrings;
  langTag: string;
  direction: "rtl" | "ltr" | "auto";
  googleFontName: string;
  default?: boolean;
};

export type LocaleKey = keyof typeof localeToProfile;

export const localeToProfile = {
  // locale key must be in lowercase
  ar: {
    name: "العربية", // Name presented in language picker
    messages: ARLocale, // Locale translations
    langTag: "ar-EG", // Extremly important used in localizing dates, numbers and sitemap,  only English alphabet and hyphen allowed
    direction: "rtl", // UI layout direction
    googleFontName: "Cairo", // For OG image generation, font must support 400 and 700 weights, write name as it should goes in a URL, words separated with '+' instead of spaces
  },
  zh: {
    name: "中文",
    messages: CNLocale,
    langTag: "zh-CN",
    direction: "ltr",
    googleFontName: "Noto+Sans+SC",
  },
  en: {
    name: "English",
    messages: ENLocale,
    langTag: "en-US",
    direction: "ltr",
    googleFontName: "IBM+Plex+Mono",
    default: true,
  },
} satisfies Record<string, LocaleProfile>;

export const SUPPORTED_LOCALES = Object.keys(localeToProfile) as LocaleKey[];

export const DEFAULT_LOCALE =
  SUPPORTED_LOCALES.find(
    key => (localeToProfile[key] as LocaleProfile)?.default === true
  ) ?? SUPPORTED_LOCALES[0];

export const LOCALES_TO_LANG = Object.fromEntries(
  // For Sitemap
  Object.entries(localeToProfile).map(([locale, profile]) => [
    locale,
    profile.langTag,
  ])
) as Record<keyof typeof localeToProfile, string>;

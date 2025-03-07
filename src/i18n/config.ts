import type { I18nStrings } from "./types";
import ARLocale from "./locales/ar";
import ENLocale from "./locales/en";

export type LocaleProfile = {
  name: string;
  messages: I18nStrings;
  langTag: string;
  direction: "rtl" | "ltr" | "auto";
  default?: boolean;
};

export type SupportedLocales = Array<keyof typeof localeToProfile>;

export const localeToProfile = {
  ar: {
    name: "العربية", // Name presented in language picker
    messages: ARLocale, // Locale translations
    langTag: "ar-EG", // Extremly important used in localizing dates, numbers and sitemap,  only English alphabet and hyphen allowed
    direction: "rtl", // UI layout direction
  },
  en: {
    name: "English",
    messages: ENLocale,
    langTag: "en-US",
    direction: "ltr",
    default: true,
  },
} satisfies Record<string, LocaleProfile>;

export const SUPPORTED_LOCALES = Object.keys(
  localeToProfile
) as SupportedLocales;

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

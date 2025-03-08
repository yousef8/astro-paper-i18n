# AstroPaper with I18n

🌍 [اقرأنى بالعربية](README.ar.md)

<div align='center'>

![AstroPaper I18n](/public/astro-paper-i18n.png)

</div>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yousef8/AstroPaperI18n/deploy.yml?branch=main) ![GitHub Release](https://img.shields.io/github/v/release/yousef8/AstroPaperI18n)

This repository is a fork of the [AstroPaper](https://github.com/satnaing/astro-paper) theme, enhanced to support internationalization (i18n).

The fork Builds upon the original AstroPaper theme to integrate i18n functionality.

I18n integration is implemented using [Astorjs i18n routing](https://docs.astro.build/en/guides/internationalization/)

As I'm a native Arabic speaker, I made sure the i18n integration supports RTL languages (etc Arabic, Persian,...).

If god wills, this fork will maintain synchronization with the original [AstroPaper](https://github.com/satnaing/astro-paper) theme.

This Fork does not modify the original theme’s UI; it solely adds i18n support.

## Table Of Contents

- [🔥 Features](#-features)
  - [UI Enhancements](#ui-enhancements)
  - [i18n Features](#i18n-features)
  - [🧪 Testing (📋 Planned)](#-testing--planned)
- [Lighthouse Score](#lighthouse-score)
- [📖 How To Use](#-how-to-use)
  - [🔧 Site Configurations](#-site-configurations)
  - [🌐 Locale Configurations](#-locale-configurations)
    - [Locale key (e.g. `ar`, `en`)](#locale-key-eg-ar-en)
    - [Locale Profile (locale key value)](#locale-profile-locale-key-value)
    - [Create Translations](#create-translations)
  - [📂 Pages folder structure](#-pages-folder-structure)
    - [📄 Shared Files](#-shared-files)
- [🚧 Known Issues](#-known-issues)

## 🔥 Features

This project includes all the features of the original [AstroPaper](https://github.com/satnaing/astro-paper) theme, with the following enhancements:

### UI Enhancements

- [x] **Direction Agnostic:**
  - [x] Full RTL support.
  - [x] Consistent UI for both `LTR` and `RTL` directions.

### i18n Features

- [x] UI translations, including numbers and dates.
- [x] Language switcher.
- [x] Accessibility-related translations.
- [x] Type-safe i18n integration using TypeScript.
- [x] Sitemaps with i18n support ([`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)).
- [x] OG image generation with i18n support
  - Note: satori does not support RTL languages, causing layout issues for RTL OG images.
- [x] RSS Feeds with i18n support ([`@astrojs/rss`](https://docs.astro.build/en/guides/rss/)).
- [ ] 📋 **Planned:**
  - [ ] Route translations.

### 🧪 Testing (📋 Planned)

- [ ] Ensure locales are properly configured.
- [ ] Verify successful rendering of all pages.
- [ ] Validate that every locale uses a `langTag` compliant with BCP47 standards (e.g., English alphabet and hyphen).

## Lighthouse Score

Click to view full report

<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-yousef8-github-io-AstroPaperI18n-ar/d2cqwqovpv?form_factor=desktop">
    <img width="710" alt="AstroPaper I18n Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## 📖 How To Use

The same way to [use and configure AstroTheme](https://github.com/satnaing/astro-paper?tab=readme-ov-file#-project-structure), but with some _major_ configuration changes.

### 🔧 Site Configurations

`SITE.title` and `SITE.desc` configuration has been replaced with `site.title` and `site.desc` translation, which is now used across whole site.

```diff
// src/config.ts

export const SITE: Site = {
  //...
-  title: "AstroPaper I18n",
-  desc: "A fork of AstroPaper theme with support for I18n",
  //...
};
```

```diff
// src/i18n/types.ts

export interface I18nStrings {
+  "site.title": string;
+  "site.desc": string;
   // ... other translations
```

### 🌐 Locale Configurations

Locale configuration has been moved from `src/config.ts` to a dedicated file for better organization.

```diff
// src/config.ts

-export const LOCALE = {
-  lang: "en", // html lang code. Set this empty and default will be "en"
-  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
-} as const;

export const LOGO_IMAGE = {
```

Instead Locale configuration is now handled in `src/i18n/config.ts`:

```ts
// src/i18n/config.ts
export const localeToProfile = {
  ar: {
    // local key
    name: "العربية", // Name presented in language picker
    messages: ARLocale, // Locale translations
    langTag: "ar-EG", // BCP 47 Language Tag (used for dates, numbers, and sitemap)
    direction: "rtl", // UI layout direction
    googleFontName: "Cairo", // For OG image generation, font must support 400 and 700 weights, replace spaces with '+'
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
```

Key Points About Locale Configuration

#### Locale key (e.g. `ar`, `en`)

- For convention it should be compliant with BCP47 names
- An array of the local keys is generated and passed to Astrojs i18n configurations to set available locales
- Each locale key is going to be in the begin of all pages URLs in the scope of the locale.
  for example all localized pages in Arabic will be available in URLs beginning with `/ar`
- Default locale key will be available at the root of the website `/` and it's locale key won't get appended at the begin of URLs
- Example:
  - Arabic locale URLs will always begin with `/ar`,if **locale key** was `ar`
  - English locale URLs will begin with `/en` if locale key was `en`
  - Except for the default locale - which is English in our case - `/en` won't get appended to the URLs instead
    the root URL `/` will redirect to default locale

#### Locale Profile (locale key value)

- `name` Display name for the language picker
- `messages` Translations for system strings (see below for how to create translations).
- `langTag` must be BCP47 name compliant
  - this was used to just localize date and time in original AstroPaper theme,
    but it's **scope was expanded to localize all the numbers too**
- `direction` UI layout direction, can be one of 3 values `rtl | ltr | auto` corresponds to html `dir` tag directives values
- `googleFontName` click _get embed code_ for a font you like on google fonts and get the name as it's from href attribute for link tag.
  this is used only in OG images
- `default` Marks the default locale. If not set, the first locale in the object is used as the default.

#### Create Translations

1. Create a file in `src/i18n/locales` named `<locale_key>.ts` (e.g. `ar.ts`, `en.ts`) - it could be named anything but I think this is more convenient :smile: -
2. Define an object of type `I18nStrings` (imported from `@i18n/types`).

   - this type will enforce all the necessary translations that should be populated by any translation
   - take a look at the type at [/src/i18n/types.ts](/src/i18n/types.ts)
   - **OR** just copy the contents one of already existing translation files [src/i18n/locales/ar.ts](/src/i18n/locales/ar.ts) or [src/i18n/locales/en.ts](/src/i18n/locales/en.ts) and change the translations with yours

3. Import that translation in `src/i18n/config` and assign it as a value to `messages` key in your locale profile

### 📂 Pages folder structure

The folder structure follows [Astro's i18n documentation](https://docs.astro.build/en/guides/internationalization/#create-localized-folders) to understand how pages folder should be structured for localized content.
But you can just check how it's structured now and mimic it - if you are that lazy :smile: -

#### 📄 Shared Files

Only one `404.astro` and `robots.txt.ts` is needed for the entire site. Place them in the root [src/pages](/src/pages) directory.

Other than that all files should exist in each local folder

## 🚧 Known Issues

- [ ] Styling in screen reader mode is currently broken and requires fixes.
  - Contributions are welcome!

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
  - [🧪 Testing](#-testing)
- [Lighthouse Score](#lighthouse-score)
- [📖 How To Use](#-how-to-use)
- [🛠️ Configuration](#%EF%B8%8F-configuration)
  - [🔧 Site Configurations](#-site-configurations)
  - [🌐 Locale Configurations](#-locale-configurations)
- [🧞 Commands](#-commands)
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

### 🧪 Testing

- [x] Unit testing with [Vitest](https://vitest.dev/)
- [x] Unit testing for i18n configurations and utilities
- [ ] Unit testing for [src/utils](/src/utils)
- [ ] Unit testing for [src/config.ts](/src/config.ts)

## Lighthouse Score

Click to view full report

<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-yousef8-github-io-AstroPaperI18n-ar/d2cqwqovpv?form_factor=desktop">
    <img width="710" alt="AstroPaper I18n Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## 📖 How To Use

### 1- Create translations file

Go to [src/i18n/locales](/src/i18n/locales) and create a file for your locale (e.g. es, ja, etc..), it should be named as `<locale_key>.ts` (e.g. es.ts, ja.ts, etc..).

Export a variable of `I18nStrings` type from `@i18n/types` with all the translations as key value pairs.

Take a look at the type at [/src/i18n/types.ts](/src/i18n/types.ts) and example file [/src/i18n/locales/ar.ts](/src/i18n/locales/ar.ts)

### 2- Define locale configuration

Go to [src/i18n/config.ts](/src/i18n/config.ts) and define a locale profile for your locale inside the configuration object `localeToProfile`.

Locale configuration is used to define the name of the locale, the translations, the language tag, the UI layout direction, and the Google font name.

Create a locale key which must be in all lowercase and complient with BCP-47 names. (eg. ar, en, es, ja, etc..), it's value is an object with the following keys:

- Assign a name to the `name` key in your locale profile, it will be used in the language picker.

- Assign translations file you created in step 1 to the `messages` key in your locale profile.

- Language tag must be in BCP47 name compliant, it's used to localize date and time in original AstroPaper theme, but it's **scope was expanded to localize all the numbers too**. (eg. en-US, ar-EG, es-ES, ja-JP, etc..)

- Google font name is used only in [OG images](https://magefan.com/blog/open-graph-meta-tags).

- set the `default` key to `true` if you want to set it, if no locale is set as default, the first locale in the object is used as the default.

- set the `direction` key to one of supported values `rtl | ltr | auto` corresponds to html `dir` tag directives values

**Note:** you may need to restart the dev server to see the changes.

**Note:** [satori](https://github.com/vercel/satori) does not support RTL languages, causing layout issues for RTL [OG images](https://magefan.com/blog/open-graph-meta-tags).

### 3- Add about page

The about page now has it's own [content collection](https://docs.astro.build/en/guides/content-collections/) because this theme supports i18n and you will likely need about page content in multiple locales.

Go to [src/content/about](/src/content/about) and create a file for your locale, it should be named as `about.<locale_key>.md` (e.g. about.en.md, about.es.md, etc..).

Same frontmatter keys as in original AstroPaper theme are supported `title` and `description` for the page title and description.

### 4- Add your content

Under [src/conent/blog](/src/content/blog) create a folder with your locale key (e.g. es, ja, etc..) as it's name and add your content in markdown format.

Any blog outside locale folder will not be considered by the site.

That's it, you're done 🎈🎉 🥳!

See [AstroPaper Docs](https://github.com/satnaing/astro-paper?tab=readme-ov-file#-documentation) for more info as this project builds upon it while to only support i18n, but everything else should be the same.

## 🛠️ Configuration

The same way to [use and configure AstroTheme](https://github.com/satnaing/astro-paper?tab=readme-ov-file#-project-structure), but with some changes.

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
  // local key must be all lowercase and complaint with BCP-47
  ar: {
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

## 🧞 Commands

Same [commands as in original theme](https://github.com/satnaing/astro-paper/tree/main?tab=readme-ov-file#-commands) with addition to

| Command              | Action                                                                                      |
| :------------------- | :------------------------------------------------------------------------------------------ |
| `npm test`           | Run all unit tests once and exit [learn more](https://vitest.dev/guide/cli.html#vitest-run) |
| `npm run test:watch` | Run unit tests in watch mode [learn more](https://vitest.dev/guide/cli.html#vitest-watch)   |
| `npm run coverage`   | Generate unit testing coverage report [learn more](https://vitest.dev/guide/coverage.html)  |

## 🚧 Known Issues

- [ ] Styling in screen reader mode is currently broken and requires fixes.
  - Contributions are welcome!

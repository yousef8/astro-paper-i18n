import {
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
  type LocaleKey,
} from "@i18n/config";
import { UnsupportedLocale } from "@i18n/errors";
import {
  buildPrefix,
  getLocaleInfo,
  getRelativeLocalePath,
  isLocaleKey,
  stripBaseAndLocale,
  translateFor,
} from "@i18n/utils";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("translateFor", () => {
  it("should return a function that translates a key for the given locale", () => {
    const translate = translateFor("en");
    expect(translate("home")).toBe(localeToProfile["en"].messages["home"]);
  });

  it("should substitute placeholders in the translation", () => {
    const translate = translateFor("en");
    const translation = translate("pageWithNo", { no: "1" });
    expect(translation).toBe("Page 1");
  });

  it("should throw error if no locale is provided", () => {
    expect(() => translateFor(undefined)).toThrow(UnsupportedLocale);
  });
});

describe("isLocaleKey", () => {
  it("should return true for supported locales", () => {
    SUPPORTED_LOCALES.forEach(locale => {
      expect(isLocaleKey(locale)).toBe(true);
    });
  });

  it("should return false for unsupported locales", () => {
    expect(isLocaleKey("unsupported")).toBe(false);
  });
});

describe("getLocaleInfo", () => {
  it("should return the locale profile for a supported locale", () => {
    const locale = SUPPORTED_LOCALES[0];
    expect(getLocaleInfo(locale)).toEqual(localeToProfile[locale]);
  });

  it("should throw error for an unsupported locale", () => {
    expect(() => getLocaleInfo("unsupported")).toThrowError(UnsupportedLocale);
  });

  it("should throw if no locale is provided", () => {
    expect(() => getLocaleInfo(undefined)).toThrowError(UnsupportedLocale);
  });
});

describe("getRelativeLocalePath", () => {
  // TODO: isolate the tests for the function by stubing default locales and supported locales
  it("should return the correct localized path for a default locale", () => {
    const path = getRelativeLocalePath("en", "/posts/1");
    expect(path).toBe("/posts/1");
  });

  it("should return the correct localized path for a supported locale", () => {
    const path = getRelativeLocalePath("ar", "/posts/1");
    expect(path).toBe("/ar/posts/1");
  });

  it("should handle trailing slashes correctly", () => {
    // TODO: split into 2 tests
    const pathWithSlash = getRelativeLocalePath("ar", "/posts/1/");
    expect(pathWithSlash).toBe("/ar/posts/1/");

    const pathWithoutSlash = getRelativeLocalePath("ar", "/posts/1");
    expect(pathWithoutSlash).toBe("/ar/posts/1");
  });

  it("should throw an error for an unsupported locale", () => {
    expect(() => getRelativeLocalePath("unsupported", "/posts/1")).toThrow();
  });

  it("should not remove trailing slash for root path `/`", () => {
    expect(getRelativeLocalePath(DEFAULT_LOCALE, "/")).toBe("/");
  });

  it("should return `/` if no path supplied for default locale", () => {
    expect(getRelativeLocalePath(DEFAULT_LOCALE)).toBe("/");
  });

  it("should return `/` if empty path `` supplied for default locale", () => {
    expect(getRelativeLocalePath(DEFAULT_LOCALE, "")).toBe("/");
  });
});

describe("stripBaseAndLocale", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should throw error for unsupported locale", () => {
    const _isLocaleKey = (locale?: string): locale is LocaleKey => false;
    expect(() =>
      stripBaseAndLocale("en", "/posts/1", _isLocaleKey)
    ).toThrowError(UnsupportedLocale);
  });

  it("should throw error for undefined locale", () => {
    expect(() => stripBaseAndLocale(undefined, "/posts/1")).toThrowError(
      UnsupportedLocale
    );
  });

  describe("for '/' as Base URL", () => {
    describe("for default locale", () => {
      it("return '/' for path '/'", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );
        expect(strippedPath).toBe("/");
      });

      it("return '/posts/1'", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/posts/1",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );

        expect(strippedPath).toBe("/posts/1");
      });

      it("appends trailing slash if path passed have it", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/posts/1/",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );

        expect(strippedPath).toBe("/posts/1/");
      });
    });

    describe("for non-default locale", () => {
      it("return '/' for path '/ja'", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/ja",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );
        expect(strippedPath).toBe("/");
      });

      it("return '/posts/1'", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/ja/posts/1",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );

        expect(strippedPath).toBe("/posts/1");
      });

      it("appends trailing slash if path passed have it", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/ja/posts/1/",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) => buildPrefix(locale, "es" as LocaleKey, "/")
        );

        expect(strippedPath).toBe("/posts/1/");
      });
    });
  });

  describe("for '/astro' as Base URL", () => {
    describe("for default locale", () => {
      it("return '/' for path '/astro'", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/astro",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );
        expect(strippedPath).toBe("/");
      });

      it("return '/posts/1'", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/astro/posts/1",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );

        expect(strippedPath).toBe("/posts/1");
      });

      it("appends trailing slash if path passed have it", () => {
        const strippedPath = stripBaseAndLocale(
          "es",
          "/astro/posts/1/",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );

        expect(strippedPath).toBe("/posts/1/");
      });
    });

    describe("for non-default locale", () => {
      it("return '/' for path '/ja'", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/astro/ja",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );
        expect(strippedPath).toBe("/");
      });

      it("return '/posts/1'", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/astro/ja/posts/1",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );

        expect(strippedPath).toBe("/posts/1");
      });

      it("appends trailing slash if path passed have it", () => {
        const strippedPath = stripBaseAndLocale(
          "ja",
          "/astro/ja/posts/1/",
          (locale?: string): locale is LocaleKey => true,
          (locale: LocaleKey) =>
            buildPrefix(locale, "es" as LocaleKey, "/astro")
        );

        expect(strippedPath).toBe("/posts/1/");
      });
    });
  });
});

describe("buildPrefix", () => {
  describe('for root slash "/" as Base Url', () => {
    it('should return "/" for default locale "es"', () => {
      const prefix = buildPrefix("es" as LocaleKey, "es" as LocaleKey, "/");
      expect(prefix).toBe("/");
    });

    it('should return "/ja" for non-default locale "ja"', () => {
      const prefix = buildPrefix("ja" as LocaleKey, "es" as LocaleKey, "/");
      expect(prefix).toBe("/ja");
    });
  });

  describe('for "/astro-paper-i18n" as Base Url', () => {
    it('should return "/astro-paper-i18n" for default locale "es"', () => {
      const prefix = buildPrefix(
        "es" as LocaleKey,
        "es" as LocaleKey,
        "/astro-paper-i18n"
      );
      expect(prefix).toBe("/astro-paper-i18n");
    });

    it('should return "/astro-paper-i18n/ja" for non-default locale "ja"', () => {
      const prefix = buildPrefix(
        "ja" as LocaleKey,
        "es" as LocaleKey,
        "/astro-paper-i18n"
      );
      expect(prefix).toBe("/astro-paper-i18n/ja");
    });
  });
});

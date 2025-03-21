import {
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
import type { I18nStrings } from "./types";

describe("translateFor", () => {
  it("should throw error if no locale is provided", () => {
    expect(() => translateFor(undefined)).toThrow(UnsupportedLocale);
  });

  it("should return a function that translates a key for the given locale", () => {
    const isLocalKey = (locale?: string): locale is LocaleKey => true;
    const getLocaleMsgs = (locale: LocaleKey) => {
      const msgs: I18nStrings = { home: "casa" } as I18nStrings;
      if (locale) return msgs;
      return msgs;
    };
    const translate = translateFor("es", isLocalKey, getLocaleMsgs);
    expect(translate("home")).toBe("casa");
  });

  it("should substitute placeholders in the translation", () => {
    const isLocalKey = (locale?: string): locale is LocaleKey => true;
    const getLocaleMsgs = (locale: LocaleKey) => {
      const msgs: I18nStrings = { pageWithNo: "Página {no}" } as I18nStrings;
      if (locale) return msgs;
      return msgs;
    };
    const translate = translateFor("es", isLocalKey, getLocaleMsgs);
    const translation = translate("pageWithNo", { no: "1" });
    expect(translation).toBe("Página 1");
  });
});

describe("isLocaleKey", () => {
  it("should return true for supported locales", () => {
    const supportedLocales = ["es", "ja"];

    supportedLocales.forEach(locale => {
      expect(isLocaleKey(locale, supportedLocales as LocaleKey[])).toBe(true);
    });
  });

  it("should return false for unsupported locales", () => {
    const supportedLocales = ["es", "ja"];
    expect(isLocaleKey("unsupported", supportedLocales as LocaleKey[])).toBe(
      false
    );
  });

  it("should return false for undefined", () => {
    const supportedLocales = ["es", "ja"];
    expect(isLocaleKey(undefined, supportedLocales as LocaleKey[])).toBe(false);
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
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    const path = getRelativeLocalePath("es", "/posts/1", {
      _isLocaleKey: isLocaleKey,
    });
    expect(path).toBe("/posts/1");
  });

  it("should return the correct localized path for a supported locale", () => {
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    const path = getRelativeLocalePath("ja", "/posts/1", {
      _isLocaleKey: isLocaleKey,
    });
    expect(path).toBe("/ja/posts/1");
  });

  it("should handle trailing slashes correctly", () => {
    // TODO: split into 2 tests
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    const pathWithSlash = getRelativeLocalePath("ja", "/posts/1/", {
      _isLocaleKey: isLocaleKey,
    });
    expect(pathWithSlash).toBe("/ja/posts/1/");

    const pathWithoutSlash = getRelativeLocalePath("ja", "/posts/1", {
      _isLocaleKey: isLocaleKey,
    });
    expect(pathWithoutSlash).toBe("/ja/posts/1");
  });

  it("should throw an error for an unsupported locale", () => {
    expect(() => getRelativeLocalePath("unsupported", "/posts/1")).toThrow();
  });

  it("should not remove trailing slash for root path `/`", () => {
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    expect(
      getRelativeLocalePath("es", "/", { _isLocaleKey: isLocaleKey })
    ).toBe("/");
  });

  it("should return `/` if no path supplied for default locale", () => {
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    expect(
      getRelativeLocalePath("es", undefined, { _isLocaleKey: isLocaleKey })
    ).toBe("/");
  });

  it("should return `/` if empty path `` supplied for default locale", () => {
    const isLocaleKey = (locale?: string): locale is LocaleKey => true;
    expect(getRelativeLocalePath("es", "", { _isLocaleKey: isLocaleKey })).toBe(
      "/"
    );
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

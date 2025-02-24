import {
  translateFor,
  isLocaleKey,
  isValidLocaleKey,
  getLocaleInfo,
  isPathLocalized,
  getRelativeLocalePath,
  resolveLocale,
  stripBaseAndLocale,
  parseLocaleFromUrlOrPath,
} from "@i18n/utils";
import {
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "@i18n/config";
import { describe, it, expect } from "vitest";

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

  it("should default to DEFAULT_LOCALE if no locale is provided", () => {
    const translate = translateFor(undefined);
    expect(translate("home")).toBe(
      localeToProfile[DEFAULT_LOCALE].messages["home"]
    );
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

describe("isValidLocaleKey", () => {
  it("should return true for supported locales", () => {
    SUPPORTED_LOCALES.forEach(locale => {
      expect(isValidLocaleKey(locale)).toBe(true);
    });
  });

  it("should return false for unsupported locales", () => {
    expect(isValidLocaleKey("unsupported")).toBe(false);
  });
});

describe("getLocaleInfo", () => {
  it("should return the locale profile for a supported locale", () => {
    const locale = SUPPORTED_LOCALES[0];
    expect(getLocaleInfo(locale)).toEqual(localeToProfile[locale]);
  });

  it("should return the default locale profile for an unsupported locale", () => {
    expect(getLocaleInfo("unsupported")).toEqual(
      localeToProfile[DEFAULT_LOCALE]
    );
  });

  it("should return the default locale profile if no locale is provided", () => {
    expect(getLocaleInfo(undefined)).toEqual(localeToProfile[DEFAULT_LOCALE]);
  });
});

describe("isPathLocalized", () => {
  it("should return true if the path contains a supported locale", () => {
    expect(isPathLocalized("/ar/posts/1")).toBe(true);
  });

  it("should return true if the path contains a supported locale and doesn't start with /", () => {
    expect(isPathLocalized("ar/posts/1")).toBe(true);
  });

  it("should return false if the path does not contain a supported locale", () => {
    expect(isPathLocalized("/posts/1")).toBe(false);
  });

  it("should return false if the path does not contain a supported locale and doesn't start with /", () => {
    expect(isPathLocalized("posts/1")).toBe(false);
  });
});

describe("getRelativeLocalePath", () => {
  it("should return the correct localized path for a default locale", () => {
    const path = getRelativeLocalePath("en", "/posts/1");
    expect(path).toBe("/posts/1");
  });

  it("should return the correct localized path for a supported locale", () => {
    const path = getRelativeLocalePath("ar", "/posts/1");
    expect(path).toBe("/ar/posts/1");
  });

  it("should handle trailing slashes correctly", () => {
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

describe("resolveLocale", () => {
  it("should return the locale if it is supported", () => {
    const locale = SUPPORTED_LOCALES[0];
    expect(resolveLocale(locale)).toBe(locale);
  });

  it("should throw an error if the locale is not supported", () => {
    expect(() => resolveLocale("unsupported")).toThrow();
  });

  it("should throw an error if the locale is undefined", () => {
    expect(() => resolveLocale(undefined)).toThrow();
  });
});

describe("stripBaseAndLocale", () => {
  it("should handle path with default locale & leading slash", () => {
    // TODO: for default locale it shouldn't remove leading slash
    const path = stripBaseAndLocale("en", `${import.meta.env.BASE_URL}posts/1`);
    expect(path).toBe("posts/1");
  });

  it.todo(
    "should handle path with default locale without leading slash",
    () => {}
  );

  it("should non-default locale path with leading slash", () => {
    const path = stripBaseAndLocale(
      "ar",
      `${import.meta.env.BASE_URL}ar/posts/1`
    );
    expect(path).toBe("/posts/1");
  });

  it.todo(
    "should handle non-default locale path without leading slash",
    () => {}
  );
});

describe("parseLocaleFromUrlOrPath", () => {
  it("should extract the locale from a URL", () => {
    const locale = parseLocaleFromUrlOrPath("https://example.com/ar/posts/1");
    expect(locale).toBe("ar");
  });

  it("should extract non-default locale from a path", () => {
    const locale = parseLocaleFromUrlOrPath("/ar/posts/2");
    expect(locale).toBe("ar");
  });

  it("should extract non-default locale from a path without leading slash", () => {
    const locale = parseLocaleFromUrlOrPath("ar/posts/2");
    expect(locale).toBe("ar");
  });

  it("should return undefined if the path does not contain a valid locale (aka default locale)", () => {
    const locale = parseLocaleFromUrlOrPath("/posts/1");
    expect(locale).toBeUndefined();
  });

  it("should return undefined if  path without leading slash does not contain a valid locale (aka default locale)", () => {
    const locale = parseLocaleFromUrlOrPath("/posts/1");
    expect(locale).toBeUndefined();
  });
});

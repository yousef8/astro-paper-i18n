import {
  DEFAULT_LOCALE,
  localeToProfile,
  SUPPORTED_LOCALES,
} from "@i18n/config";
import { UnsupportedLocale } from "@i18n/errors";
import {
  getLocaleInfo,
  getRelativeLocalePath,
  isLocaleKey,
  stripBaseAndLocale,
  translateFor,
} from "@i18n/utils";
import { describe, expect, it } from "vitest";

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

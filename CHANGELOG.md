# Changelog

## [0.4.0](https://github.com/yousef8/astro-paper-i18n/compare/v0.3.0...v0.4.0) (2025-03-21)


### Features

* restructure pages folder for dynamic locale-based path generation ([#19](https://github.com/yousef8/astro-paper-i18n/issues/19)) ([2bcd3f4](https://github.com/yousef8/astro-paper-i18n/commit/2bcd3f4eee1f8c7c2c56aeff3a0dbd3eeebf9fc1))

## [0.3.0](https://github.com/yousef8/astro-paper-i18n/compare/v0.2.0...v0.3.0) (2025-03-08)

### Sync With Upstream

* use tag name for display in tags page (satnaing/astro-paper[#438](https://github.com/yousef8/astro-paper-i18n/issues/438)) ([6fb1c56](https://github.com/yousef8/astro-paper-i18n/commit/6fb1c5698fa2f64ee0b2708aed79349f44a89b05))

With this commit we have completely synced with AstroPaper release 4.8.0

### Features

* add i18n support for RSS ([91997fc](https://github.com/yousef8/astro-paper-i18n/commit/91997fc0cbbc75938b433e85a192f7d4ce9933ae))
* use base config in developement mode ([068b229](https://github.com/yousef8/astro-paper-i18n/commit/068b229c0d615ae174a8231e8c9274d0db66ee2f))

### Bug Fixes

* leave trailing slash for root path `/` resulting from getRelativeLocalePath ([874bbf0](https://github.com/yousef8/astro-paper-i18n/commit/874bbf00fa776b18cdae24e80723744cdc1bac8c))

## [0.2.0](https://github.com/yousef8/astro-paper-i18n/compare/v0.1.0...v0.2.0) (2025-03-07)


### Features

* add i18n support ([47e08a4](https://github.com/yousef8/astro-paper-i18n/commit/47e08a47913feb34ea328bde16b60d11276d50a0))
* localize generated OG image for both site and posts ([5221ed2](https://github.com/yousef8/astro-paper-i18n/commit/5221ed27e6230bcb5d770bf468f05d21eb212627))
* localize SITE.desc, but keep original `SITE.desc` config for OG image ([#11](https://github.com/yousef8/astro-paper-i18n/issues/11)) ([d05852a](https://github.com/yousef8/astro-paper-i18n/commit/d05852a1f7f89a3a9e6778742fb2aaae13e1698f))
* use site.desc translation on whole site and delete SITE.desc config ([60bada6](https://github.com/yousef8/astro-paper-i18n/commit/60bada60f87fc4cd0d8ce0d21661edde4748c51d))


### Bug Fixes

* remove trailing slash from paths to resolve OG image generation issue ([458486a](https://github.com/yousef8/astro-paper-i18n/commit/458486a1047057a91e8144fd1cf8ac1da3bdd247))

## [0.1.0](https://github.com/yousef8/astro-paper-i18n/compare/v0.0.0...v0.1.0) (2025-03-07)


### Features

* make UI layout direction-agnostic for RTL support ([#9](https://github.com/yousef8/astro-paper-i18n/issues/9)) ([a744080](https://github.com/yousef8/astro-paper-i18n/commit/a744080fcfa9658339791d4ab5fa651716b084ec))
* respect base URL from Astro config in internal links redirection ([ee696ab](https://github.com/yousef8/astro-paper-i18n/commit/ee696ab84890ff758c444154abb2d760d40bddd2))
* update site with personal links and info ([50e8aee](https://github.com/yousef8/astro-paper-i18n/commit/50e8aee55270762bc4f92940c959f591d7fe7e89))

## 0.0.0 (2024-12-26)

* Fresh fork from [AstroPaper](https://github.com/satnaing/astro-paper) theme
  * nothing is added yet

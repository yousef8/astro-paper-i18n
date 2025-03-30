import type { I18nStrings } from "@/i18n/types";

const baseStrings = {
  "site.title": "AstroPaper 多语言版",
  "site.desc": "支持多语言的 AstroPaper 主题分支",
};

const CNLocale: I18nStrings = {
  ...baseStrings,
  "hero.title": "你好",
  "hero.body": `
        AstroPaper 是一个极简、响应式、无障碍且对SEO友好的 Astro 博客主题。
        该主题遵循最佳实践，开箱即提供无障碍支持。
        默认支持浅色和深色模式，此外还可以配置其他配色方案。
`,
  "hero.beforeReadme": "阅读博客文章或查看",
  "hero.readme": "README",
  "hero.afterReadme": "获取更多信息。",
  copy: "复制",
  copied: "已复制",
  by: "作者",
  about: "关于",
  socialLinks: "社交链接",
  home: "首页",
  posts: "文章",
  "posts.desc": "我发布的所有文章。",
  tag: "标签",
  "tag.desc": '所有带有"{name}"标签的文章。',
  tags: "标签",
  "tags.desc": "文章中使用的所有标签",
  archives: "归档",
  "archives.desc": "我归档的所有文章。",
  featured: "精选",
  recentPosts: "最新文章",
  tableOfContents: "目录",
  "tableOfContents.desc": "打开目录",
  allPosts: "所有文章",
  search: "搜索",
  "search.desc": "搜索任意文章",
  "search.placeholder": "搜索内容...",
  pages: "页面",
  page: "页",
  pageWithNo: "第 {no} 页",
  "navigation.goBack": "返回",
  "navigation.goBackHome": "返回首页",
  "navigation.backToTop": "返回顶部",
  "navigation.nextPost": "下一篇",
  "navigation.prevPost": "上一篇",
  pageNotFound: "页面未找到",
  notFound: "未找到",
  rssFeed: "RSS 订阅",
  suggestChanges: "建议修改",
  toggleLightAndDark: "切换浅色/深色模式",
  "pagination.prev": "上一页",
  "pagination.next": "下一页",
  "footer.text": "版权所有 © {year} | 保留所有权利",
  "date.published": "发布于",
  "date.updated": "更新于",
  "date.month.1": "一月",
  "date.month.2": "二月",
  "date.month.3": "三月",
  "date.month.4": "四月",
  "date.month.5": "五月",
  "date.month.6": "六月",
  "date.month.7": "七月",
  "date.month.8": "八月",
  "date.month.9": "九月",
  "date.month.10": "十月",
  "date.month.11": "十一月",
  "date.month.12": "十二月",
  "socials.github": `${baseStrings["site.title"]} 的 Github`,
  "socials.facebook": `${baseStrings["site.title"]} 的 Facebook`,
  "socials.instagram": `${baseStrings["site.title"]} 的 Instagram`,
  "socials.linkedin": `${baseStrings["site.title"]} 的 LinkedIn`,
  "socials.mail": `发送邮件至 ${baseStrings["site.title"]}`,
  "socials.x": `${baseStrings["site.title"]} 的 X`,
  "socials.twitch": `${baseStrings["site.title"]} 的 Twitch`,
  "socials.youtube": `${baseStrings["site.title"]} 的 Youtube`,
  "socials.whatsapp": `${baseStrings["site.title"]} 的 Whatsapp`,
  "socials.snapchat": `${baseStrings["site.title"]} 的 Snapchat`,
  "socials.pinterest": `${baseStrings["site.title"]} 的 Pinterest`,
  "socials.tiktok": `${baseStrings["site.title"]} 的 TikTok`,
  "socials.codepen": `${baseStrings["site.title"]} 的 CodePen`,
  "socials.discord": `${baseStrings["site.title"]} 的 Discord`,
  "socials.gitlab": `${baseStrings["site.title"]} 的 GitLab`,
  "socials.reddit": `${baseStrings["site.title"]} 的 Reddit`,
  "socials.skype": `${baseStrings["site.title"]} 的 Skype`,
  "socials.steam": `${baseStrings["site.title"]} 的 Steam`,
  "socials.telegram": `${baseStrings["site.title"]} 的 Telegram`,
  "socials.mastodon": `${baseStrings["site.title"]} 的 Mastodon`,
  "sharePost.desc": "在以下平台分享此文章",
  "sharePost.on": "在{media}分享此文章",
  "sharePost.via": "通过{media}分享此文章",
  "a11y.skipToContent": "跳至内容",
  "a11y.rssFeed": "RSS订阅",
  "a11y.openMenu": "打开菜单",
  "a11y.closeMenu": "关闭菜单",
  "a11y.archives": "归档",
  "a11y.search": "搜索",
  "a11y.themeButtonDefaultLabel": "自动",
  "a11y.pagination": "分页",
  "a11y.breadcrumb": "面包屑导航",
  "a11y.languagePicker": "语言选择器",
};

export default CNLocale;

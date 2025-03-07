import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://yousef8.github.io", // replace this with your deployed domain
  base: "/astro-paper-i18n", // only needed for deployment on github pages other than that remove it or set it to empty string ""
  author: "Yousef Elsayed",
  profile: "https://yousef8.github.io/astro-paper-i18n",
  desc: "AstroPaper fork with i18n support",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/yousef8/astro-paper-i18n/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: true,
  },
  {
    name: "Instagram",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    active: false,
  },
  {
    name: "X",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Skype",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/yousef8/astro-paper-i18n",
    active: false,
  },
];

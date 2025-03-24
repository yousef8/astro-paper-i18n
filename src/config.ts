export const SITE = {
  website: "https://astro-paper-i18n.netlify.app/", // replace this with your deployed domain
  author: "Yousef Elsayed",
  profile: "https://yousef8.github.io/astro-paper-i18n",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    url: "https://github.com/yousef8/astro-paper-i18n/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
  dynamicOgImage: true,
} as const;

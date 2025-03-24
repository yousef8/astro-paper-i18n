export const SITE = {
  website: "https://yousef8.github.io", // replace this with your deployed domain
  base: "/astro-paper-i18n", // only needed for deployment on github pages other than that remove it or set it to empty string ""
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
} as const;

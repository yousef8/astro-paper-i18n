import type { APIRoute } from "astro";
import getRelativePath from "@/utils/getRelativePath";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(getRelativePath("sitemap-index.xml"), site);
  return new Response(getRobotsTxt(sitemapURL));
};

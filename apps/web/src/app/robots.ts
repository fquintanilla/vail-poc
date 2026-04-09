import type { MetadataRoute } from "next";

/** Polite crawlers: do not fetch /preview. Still pair with noindex headers/meta. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview"],
    },
  };
}

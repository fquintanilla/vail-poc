import "server-only";

import { headers } from "next/headers";
import { cache } from "react";
import { resolveSiteConfigByHostname } from "@/lib/site-config";

export const getRequestSiteConfig = cache(async () => {
  const requestHeaders = await headers();
  return resolveSiteConfigByHostname(requestHeaders.get("host"));
});

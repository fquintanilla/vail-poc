/**
 * Contentstack Preview Proxy
 *
 * Rewrites requests to the preview page when preview mode is enabled.
 * Used so that editors in Contentstack's preview can see draft content
 * by loading the site through /preview, which uses live/draft API data.
 *
 * Enable by setting NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true in .env.local.
 * When disabled, requests pass through unchanged (normal production behavior).
 */

import { type NextRequest, NextResponse } from "next/server";

/**
 * Rewrites the request to /preview (or /preview + pathname) when
 * NEXT_PUBLIC_CONTENTSTACK_PREVIEW is "true"; otherwise continues the request.
 */
export function proxy(_request: NextRequest) {
  // const pathname = _request.nextUrl.pathname;
  // const search = request.nextUrl.search;
  // if (env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true") {
  //   const targetPath = pathname === "/" ? "/preview" : `/preview${pathname}`;
  //   return NextResponse.rewrite(new URL(targetPath + search, request.url));
  // }

  return NextResponse.next();
}

/** Paths that trigger this proxy. Only "/" is matched; extend if you need preview for other entry routes. */
export const config = {
  matcher: ["/"],
};

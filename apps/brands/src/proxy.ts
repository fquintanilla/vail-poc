/**
 * Contentstack Preview Proxy (Next.js 16 `proxy.ts`)
 *
 * Rewrites internally to `/preview` so Live Preview can configure the stack.
 * Requires BOTH:
 * - `NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true` on the deployment (off in production
 *   unless you intentionally enable preview there), and
 * - `live_preview` (and related params) in the URL, which Contentstack adds when
 *   opening the site from the editor.
 *
 * Without the env flag, query tampering cannot switch traffic to draft APIs.
 * Without the params, enabling the flag alone does not rewrite every visit to preview.
 * The visible URL stays unchanged (rewrite, not redirect).
 */

import { type NextRequest, NextResponse } from "next/server";
import { env } from "process";

/** HTTP-level noindex for rewritten preview responses (URL may still show / or /path). */
const PREVIEW_ROBOTS_TAG =
  "noindex, nofollow, noarchive, nosnippet, noimageindex";

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const previewAllowed =
    env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true" &&
    searchParams.has("live_preview");

  if (previewAllowed) {
    const target = pathname === "/" ? "/preview" : `/preview${pathname}`;
    const res = NextResponse.rewrite(
      new URL(`${target}?${searchParams.toString()}`, request.url),
    );
    res.headers.set("X-Robots-Tag", PREVIEW_ROBOTS_TAG);
    return res;
  }

  return NextResponse.next();
}

export const proxyConfig = {
  /**
   * Match routes Contentstack may open with Live Preview.
   * Extend when you add more content pages. Excludes static assets and API.
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};

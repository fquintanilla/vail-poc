import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  url?: string;
  contenttype?: string;
  brand?: string;
  tag?: string;
  secret?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { url, contenttype, brand, tag, secret } =
      (await request.json()) as RevalidateBody;

    console.log("DEBUG: request", request);

    // Protect the endpoint
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const hasUrl =
      typeof url === "string" && url.length > 0 && url !== "undefined";
    const hasContentType =
      typeof contenttype === "string" &&
      contenttype.length > 0 &&
      contenttype !== "undefined";
    const hasBrand =
      typeof brand === "string" && brand.length > 0 && brand !== "undefined";
    const hasTag = typeof tag === "string" && tag.length > 0;

    if (!hasUrl && !hasContentType && !hasTag) {
      return NextResponse.json(
        { message: "At least one of url, contenttype or tag is required" },
        { status: 400 },
      );
    }

    if (contenttype === "header") {
      revalidatePath("/", "layout");
    } else if (hasUrl) {
      revalidatePath(url);

      // `revalidatePath(path, "layout")` — the second argument is the *scope* of what
      // gets invalidated in the App Router cache for that URL segment:
      //
      // - `"layout"`: drop cached RSC payloads for the **layout at `path` and every
      //   descendant route** (nested layouts + pages under that segment). Use this
      //   when something shared by a subtree changed (section chrome, layout-level
      //   data, etc.) and you want the next request to refresh the whole branch, not
      //   only the single page that matches `path` exactly.
      //
      // - One-arg `revalidatePath(path)` (equivalent to type `"page"` for that path):
      //   narrower — focused on the **page** at that segment rather than widening to
      //   the full layout subtree. Pick this when only that specific route’s output
      //   should be busted.
      //
      // Note: this still only affects paths Next has actually cached; it does not
      // enumerate “every URL on the internet.” For cross-cutting cache (many pages),
      // prefer tagging fetches / `unstable_cache` and `revalidateTag` instead.
      //
      // https://nextjs.org/docs/app/api-reference/functions/revalidatePath
      // revalidatePath(path, "layout");
    }
    if (hasTag) {
      revalidateTag(tag, "max");
    }

    return NextResponse.json({
      revalidated: true,
      ...(hasUrl ? { url } : {}),
      ...(hasContentType ? { contenttype } : {}),
      ...(hasBrand ? { brand } : {}),
      ...(hasTag ? { tag } : {}),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 },
    );
  }
}

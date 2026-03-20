import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  path?: string;
  tag?: string;
  secret?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { path, tag, secret } = (await request.json()) as RevalidateBody;

    // Protect the endpoint
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const hasPath = typeof path === "string" && path.length > 0;
    const hasTag = typeof tag === "string" && tag.length > 0;

    if (!hasPath && !hasTag) {
      return NextResponse.json(
        { message: "At least one of path or tag is required" },
        { status: 400 },
      );
    }

    if (hasPath) {
      revalidatePath(path);

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
      ...(hasPath ? { path } : {}),
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

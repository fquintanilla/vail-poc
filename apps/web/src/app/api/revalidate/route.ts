import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  url?: string;
  brand?: string;
  secret?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { url, brand, secret } = (await request.json()) as RevalidateBody;

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const hasUrl =
      typeof url === "string" && url.length > 0 && url !== "undefined";
    const hasBrand =
      typeof brand === "string" && brand.length > 0 && brand !== "undefined";

    if (hasBrand && hasUrl) {
      //revalidatePath(url);
      revalidateTag(`page-${brand}-${url}`, "max");

      return NextResponse.json({
        revalidated: true,
        scope: "brand-page",
        brand,
        url,
        timestamp: new Date().toISOString(),
      });
    }

    if (hasBrand) {
      revalidateTag(`brand-${brand}`, "max");

      return NextResponse.json({
        revalidated: true,
        scope: "brand",
        brand,
        timestamp: new Date().toISOString(),
      });
    }

    revalidateTag("contentstack", "max");

    return NextResponse.json({
      revalidated: true,
      scope: "all-contentstack",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 },
    );
  }
}

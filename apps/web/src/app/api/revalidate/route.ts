import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();

    // Protect the endpoint
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json(
        { message: "Path is required" },
        { status: 400 },
      );
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 },
    );
  }
}

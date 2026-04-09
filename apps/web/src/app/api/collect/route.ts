import { NextRequest, NextResponse } from "next/server";
import {
  type CanonicalEvent,
  type EnrichedCanonicalEvent,
  isCanonicalEvent,
} from "@/lib/analytics/events";
import { sendEventToAdobe } from "@/lib/analytics/adapters/adobe";

// Keep this route on the default Node.js runtime for now.
// Next.js disables route segment config like `runtime = "edge"` when
// `nextConfig.cacheComponents` is enabled. Revisit this if cacheComponents
// is removed or Next.js changes that constraint.
// export const runtime = "edge";

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip")
  );
}

function enrichEvent(
  event: CanonicalEvent,
  request: NextRequest,
): EnrichedCanonicalEvent {
  return {
    ...event,
    context: {
      requestId: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: getClientIp(request) ?? null,
    },
  };
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!isCanonicalEvent(payload)) {
    return NextResponse.json(
      { ok: false, error: "invalid_event_payload" },
      { status: 400 },
    );
  }

  const enrichedEvent = enrichEvent(payload, request);

  // Temporarily disable the Adobe consumer while the integration is being validated.
  // const adobe = await sendEventToAdobe(enrichedEvent);
  console.log("[analytics.collect] Adobe dispatch skipped", {
    event: enrichedEvent.event,
    requestId: enrichedEvent.context.requestId,
  });
  const adobe = {
    ok: false as const,
    reason: "disabled_temporarily",
  };

  return NextResponse.json(
    {
      ok: true,
      event: enrichedEvent.event,
      requestId: enrichedEvent.context.requestId,
      consumers: {
        adobe,
      },
    },
    { status: adobe.ok ? 202 : 200 },
  );
}

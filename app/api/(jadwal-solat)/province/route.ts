import { NextResponse } from "next/server";

/**
 * DEPRECATED: This endpoint is no longer needed.
 * Province data is no longer provided separately by the new API.
 * Use /api/cities instead to get all kabupaten/kota with their respective provinces.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: false,
      message: "This endpoint is deprecated. Use /api/cities instead.",
    },
    { status: 410 }, // 410 Gone
  );
}

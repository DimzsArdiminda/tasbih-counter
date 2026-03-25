import { NextRequest, NextResponse } from "next/server";
import { CariKabkotaResponse } from "@/types/jadwal-solat";

const MYQURAN_API_BASE = "https://api.myquran.com/v3/sholat";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json(
      { status: false, message: "Search query is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${MYQURAN_API_BASE}/kabkota/cari/${encodeURIComponent(query.trim())}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to search cities");
    }

    const data: CariKabkotaResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching cities:", error);
    return NextResponse.json(
      { status: false, message: "Failed to search cities" },
      { status: 500 },
    );
  }
}

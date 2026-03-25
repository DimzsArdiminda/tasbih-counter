import { NextRequest, NextResponse } from "next/server";
import { JadwalResponse, GetKabkotaResponse } from "@/types/jadwal-solat";

const MYQURAN_API_BASE = "https://api.myquran.com/v3/sholat";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const date = searchParams.get("date"); // Format: YYYY-MM-DD, optional (defaults to today)

  if (!id) {
    return NextResponse.json(
      { status: false, message: "City ID is required" },
      { status: 400 },
    );
  }

  try {
    // Verify city ID exists
    const cityCheckResponse = await fetch(`${MYQURAN_API_BASE}/kabkota/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!cityCheckResponse.ok) {
      return NextResponse.json(
        { status: false, message: "Invalid city ID" },
        { status: 404 },
      );
    }

    // Build prayer schedule URL
    let prayerUrl = `${MYQURAN_API_BASE}/jadwal/${id}`;
    if (date) {
      prayerUrl += `/${date}`;
    } else {
      prayerUrl += `/today`;
    }
    prayerUrl += `?tz=Asia/Jakarta`;

    const prayerResponse = await fetch(prayerUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!prayerResponse.ok) {
      throw new Error("Failed to fetch prayer schedule");
    }

    const data: JadwalResponse = await prayerResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching prayer data:", error);
    return NextResponse.json(
      { status: false, message: "Failed to fetch prayer data" },
      { status: 500 },
    );
  }
}

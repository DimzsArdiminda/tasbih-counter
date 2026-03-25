import { NextResponse } from "next/server";
import { KabkotaResponse } from "@/types/jadwal-solat";

const MYQURAN_API_BASE = "https://api.myquran.com/v3/sholat";

export async function GET() {
  try {
    const response = await fetch(`${MYQURAN_API_BASE}/kabkota/all`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cities data from MyQuran API");
    }

    const data: KabkotaResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return NextResponse.json(
      { status: false, message: "Failed to fetch cities data" },
      { status: 500 },
    );
  }
}

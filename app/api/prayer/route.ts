import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
//   const latitude = -8.53695;
//   const longitude = 115.402972222222;

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `http://loscos4w40ko04sss0cg0wo4.70.153.72.107.sslip.io/prayer?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer data");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching prayer data:", error);
    return NextResponse.json(
      { error: "Failed to fetch prayer data" },
      { status: 500 },
    );
  }
}

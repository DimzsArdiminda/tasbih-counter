import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `http://loscos4w40ko04sss0cg0wo4.70.153.72.107.sslip.io/cities`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cities data");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities data" },
      { status: 500 },
    );
  }
}

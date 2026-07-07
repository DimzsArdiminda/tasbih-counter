import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { message: "Latitude dan Longitude wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "my-nextjs-app/1.0",
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data lokasi");
    }

    const data = await response.json();

    return NextResponse.json({
      province: data.address?.state ?? null,
      city: data.address?.city ?? data.address?.county ?? null,
      district: data.address?.suburb ?? data.address?.town ?? null,
      fullAddress: data.display_name,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat mengambil lokasi.",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}

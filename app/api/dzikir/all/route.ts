import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.dzikir.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

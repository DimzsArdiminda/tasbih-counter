import { CheckAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await CheckAuth();
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await prisma.countTarget.findMany({
      where: {
        userId: session.user?.id,
      },
      orderBy: {
        target: "asc",
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Error fetching count targets:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

import { CheckAuth } from "@/helper/session";
import { auth } from "@/helper/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await CheckAuth();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.dzikirHistory.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Semua history berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error clearing dzikir history:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

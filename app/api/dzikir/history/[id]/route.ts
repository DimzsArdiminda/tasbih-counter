import { CheckAuth } from "@/helper/session";
import { auth } from "@/helper/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    await CheckAuth();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "ID history tidak ditemukan" },
        { status: 400 },
      );
    }

    const record = await prisma.dzikirHistory.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json(
        { message: "History tidak ditemukan" },
        { status: 404 },
      );
    }

    if (record.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Anda tidak memiliki izin untuk menghapus history ini" },
        { status: 403 },
      );
    }

    await prisma.dzikirHistory.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "History berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting dzikir history:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

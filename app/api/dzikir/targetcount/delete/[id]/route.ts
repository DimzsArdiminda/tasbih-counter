import { CheckAuth } from "@/helper/session";
import { prisma } from "@/lib/prisma";
import { auth } from "@/helper/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await CheckAuth();
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const target = await prisma.countTarget.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!target) {
      return NextResponse.json(
        { message: "Target tidak ditemukan" },
        { status: 404 },
      );
    }

    if (target.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Anda tidak memiliki izin untuk menghapus target ini" },
        { status: 403 },
      );
    }

    await prisma.countTarget.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Target berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting count target:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

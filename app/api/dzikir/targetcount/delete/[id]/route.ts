import { CheckAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    console.log("Attempting to delete target with ID:", id);

    await CheckAuth();

    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "ID target tidak ditemukan" },
        { status: 400 },
      );
    }

    const target = await prisma.countTarget.findUnique({
      where: {
        id,
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
        {
          message: "Anda tidak memiliki izin untuk menghapus target ini",
        },
        { status: 403 },
      );
    }

    await prisma.countTarget.delete({
      where: {
        id,
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

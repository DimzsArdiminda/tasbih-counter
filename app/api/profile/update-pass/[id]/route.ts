import { auth, CheckAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis/redis";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await CheckAuth();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (session.user.id !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    const confirmPassword = String(body.confirmPassword || "");

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Password baru dan konfirmasi password harus diisi" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password baru minimal 6 karakter" },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Konfirmasi password tidak sesuai" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, password: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    }

    if (user.password) {
      if (!currentPassword) {
        return NextResponse.json(
          { message: "Password lama harus diisi" },
          { status: 400 },
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);

      if (!isValid) {
        return NextResponse.json(
          { message: "Password lama tidak sesuai" },
          { status: 400 },
        );
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    await redis.del(`profile:${id}`);

    return NextResponse.json(
      { message: "Password berhasil diperbarui" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

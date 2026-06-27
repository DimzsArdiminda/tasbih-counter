import { auth, CheckAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
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

    const profile = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
        },
    });

    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile, { status:200 });

  } catch (error) {
    console.error("Error fetching profile:", error);

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

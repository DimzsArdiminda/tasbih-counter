import { CheckAuth } from "@/helper/session";
import { auth } from "@/helper/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await CheckAuth();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const records = await prisma.dzikirHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      records.map((record) => ({
        id: record.id,
        dhikrName: record.dhikrName,
        count: record.count,
        target: record.target,
        completed: record.completed,
        date: record.createdAt.toISOString(),
      })),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching dzikir history:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await CheckAuth();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dhikrName, count, target, completed } = body;

    if (!dhikrName || typeof count !== "number" || typeof target !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const created = await prisma.dzikirHistory.create({
      data: {
        userId: session.user.id,
        dhikrName,
        count,
        target,
        completed: Boolean(completed),
      },
    });

    return NextResponse.json(
      {
        id: created.id,
        dhikrName: created.dhikrName,
        count: created.count,
        target: created.target,
        completed: created.completed,
        date: created.createdAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating dzikir history:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}

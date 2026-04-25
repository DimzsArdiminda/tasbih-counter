import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CheckAuth } from "@/helper/session";

interface AddDzikirRequest {
    name: string;
    arabic: string;
    translation: string;
    userId? : string;
    targetDefault: number;
}

export async function POST(request: NextRequest) {
  try {
    CheckAuth();
    const body: AddDzikirRequest = await request.json();

    if (
        !body.name ||
        !body.arabic ||
        !body.translation ||
        body.targetDefault === undefined
    ) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
        );
    }

    // Create dzikir with userId
    const dzikir = await prisma.dzikir.create({
    data: {
        name: body.name,
        arabic: body.arabic,
        translation: body.translation,
        targetDefault: body.targetDefault,
        userId: body.userId,
        },
    });
        return NextResponse.json(dzikir, { status: 201 });
    } catch (error) {
        console.error("Error adding dzikir:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

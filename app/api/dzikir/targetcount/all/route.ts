    import { prisma } from "@/lib/prisma";
    import { auth } from "@/helper/auth";
    import { NextResponse } from "next/server";

    export async function GET() {
    try {
        const session = await auth();

        // fetch preset + custom target bersamaan
        const [presetTargets, userTargets] = await Promise.all([
        prisma.countTarget.findMany({
            where: {
            userId: null,
            },
            orderBy: {
            target: "asc",
            },
        }),

        session?.user?.id
            ? prisma.countTarget.findMany({
                where: {
                userId: session.user.id,
                },
                orderBy: {
                target: "asc",
                },
            })
            : Promise.resolve([]),
        ]);

        // gabungkan data
        const allTargets = [...presetTargets, ...userTargets];

        // remove duplicate berdasarkan target
        const uniqueTargets = Array.from(
        new Map(allTargets.map((item) => [item.target, item])).values(),
        ).sort((a, b) => a.target - b.target);

        return NextResponse.json(uniqueTargets, {
        status: 200,
        });
    } catch (error) {
        console.error("Error fetching count targets:", error);

        return NextResponse.json(
        {
            message:
            error instanceof Error ? error.message : "Terjadi kesalahan server",
        },
        {
            status: 500,
        },
        );
    }
    }

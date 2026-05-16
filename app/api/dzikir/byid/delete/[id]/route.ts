import { CheckAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> },
    ) {
        try {
            await CheckAuth();

            const { id } = await context.params;

            if (!id) {
            return NextResponse.json(
                { message: "ID tidak ditemukan" },
                { status: 400 },
            );
            }

            await prisma.dzikir.delete({
            where: { id },
            });

            return NextResponse.json(
            { message: "Dzikir berhasil dihapus" },
            { status: 200 },
            );
        } catch (error) {
            return NextResponse.json(
            {
                message:
                error instanceof Error ? error.message : "Terjadi kesalahan server",
            },
            { status: 500 },
            );
        }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckAuth, auth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis/redis";
import fs from "fs";
import path from "path";

export async function PUT(request: NextRequest) {
    try {
        await CheckAuth();

        // get session to confirm user
        const session = await auth();

        let id: string | undefined;
        let name: string | undefined;
        let email: string | undefined;
        let address: string | undefined;
        let photoUrl: string | undefined;

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const form = await request.formData();
            id = String(form.get("id") || "");
            name = String(form.get("name") || "");
            email = String(form.get("email") || "");

            const file = form.get("photo") as File | null

            if (file && typeof (file as any).arrayBuffer === "function") {
                const uploadsDir = path.join(process.cwd(), "public", "uploads");
                if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

                const buf = Buffer.from(await file.arrayBuffer());
                const originalName = (file as any).name || "photo";
                const ext = path.extname(originalName) || ".jpg";
                const filename = `${id || "user"}-${Date.now()}${ext}`;
                const filepath = path.join(uploadsDir, filename);
                fs.writeFileSync(filepath, buf);
                photoUrl = `/uploads/${filename}`;
            }
        } else {
            const body = await request.json();
            id = body.id;
            name = body.name;
            email = body.email;
        }

        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        }

        if (session?.user?.id !== id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const dataToUpdate: any = { name, email };
        if (photoUrl) dataToUpdate.photo = photoUrl;

        const resp = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });

        if (!resp) {
            return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
        }

        // Invalidate cache
        try {
            await redis.del(`profile:${id}`);
        } catch (e) {
            console.warn("Failed to clear profile cache", e);
        }

        const updated = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, photo: true, createdAt: true },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
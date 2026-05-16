import { CheckAuth } from "@/helper/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await CheckAuth()
        const res = await prisma.countTarget.findMany({
            where:{
                userId : null,
            },
            orderBy: {
                target: "asc",
            },
        })
        return NextResponse.json(res, { status: 200 });
    }catch(error){
        console.error("Error fetching count targets:", error);
        return NextResponse.json(
            {
                message:
                    error instanceof Error ? error.message : "Terjadi kesalahan server",
            },
            { status: 500 },
        );
    }
}
import { CheckAuth } from "@/helper/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try{
        CheckAuth();
        const { target, userId } = await request.json();

        if(target === undefined){
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 },
            );
        }
        const addTarget = await prisma.countTarget.create({
            data:{
                target,
                userId: userId  ,
            }
        })
        return new Response(JSON.stringify(addTarget), { status: 201 });
    }catch(error){
        console.error("Error adding target:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 },
        );
    }
}
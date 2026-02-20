import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password, name} = await req.json();
    
    const hasedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data : {
                email,
                name,
                password : hasedPassword,
            }
        })
        return NextResponse.json({ user }, { status : 201 })
    } catch (error) {
        return NextResponse.json({ error : error }, { status : 500 })
    }
    
}
import { CheckAuth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(request : NextRequest){
    try{
        await CheckAuth();
        
        const body = await request.json();
        const { id, name, email, phone, address } = body;
        
        const resp = await prisma?.user.update({
            where: { id },
            data: { name, email, phone, address }
        });
        if(!resp){
            return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Profile updated successfully" },
            { status: 200 },
        );
    }catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
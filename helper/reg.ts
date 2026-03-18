"use server";

import { RegisterSchema } from "@/app/schemas/register";

export async function registerUser(email: string, password: string, name: string, confirmPassword: string) {
    try {
        const bodyParse = RegisterSchema.safeParse({
            email,
            password,
            name
        });

        if (!bodyParse.success) {
            const errorMessages = bodyParse.error.issues.map((err) => err.message).join(", ");
            throw new Error(errorMessages);
        }
        
        const pass = bodyParse.data.password;
        const confirmPass = bodyParse.data.confirmPassword;
        if (password !== confirmPassword) {
            
        }

    }catch(error){
        throw new Error((error as Error).message || "Terjadi kesalahan saat memproses data");
    
    }
}
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session : {
        strategy : "jwt" as const,
    },

    providers : [
        Credentials({
            name : "Credentials",
            credentials : {
                email : { label : "Email", type : "email", placeholder : "" },
                password : { label : "Password", type : "password", placeholder : "" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials.email,
                    }
                })

                if (!user || !user.password) {
                    throw new Error("User not found");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return user;
            }
        })
    ],

    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
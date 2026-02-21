import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { User } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.AUTH_SECRET,

    providers: [
        Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "" },
            password: { label: "Password", type: "password", placeholder: "" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
            }

            const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (!user || !user.password) {
            throw new Error("User not found");
            }

            const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
            );

            if (!isValid) {
            throw new Error("Invalid password");
            }

            return user;
        },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user) {
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
        }
        return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
        }
        return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

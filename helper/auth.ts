import NextAuth from "next-auth";
import { authOptions } from "@/helper/authoptn";

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

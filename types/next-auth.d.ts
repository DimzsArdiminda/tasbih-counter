import { DefaultSession } from "next-auth";

 declare module "next-auth" {
   interface Session {
     user: {
       id: string;
       photo?: string | null;
     } & DefaultSession["user"];
   }

   interface User {
     id: string;
     photo?: string | null;
     name?: string | null;
     email?: string | null;
     password?: string | null;
   }
 }

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    photo?: string | null;
  }
}

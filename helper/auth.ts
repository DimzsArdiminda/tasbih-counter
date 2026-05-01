import { getServerSession } from "next-auth/next";
import { authOptions } from "@/helper/authoptn";

export const auth = () => getServerSession(authOptions);

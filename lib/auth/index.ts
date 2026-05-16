import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

export const auth = () => getServerSession(authOptions);

export async function CheckAuth(): Promise<boolean> {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return true;
}

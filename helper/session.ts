import { auth } from "@/helper/auth";

export async function CheckAuth(): Promise<boolean> {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return true;
}

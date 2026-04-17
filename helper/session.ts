import { auth } from "@/helper/auth";

export async function CheckAuth(): Promise<boolean> {
  const session = await auth();
  return !!session;
}

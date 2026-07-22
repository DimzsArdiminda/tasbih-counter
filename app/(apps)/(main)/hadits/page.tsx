import { prisma } from "@/lib/prisma";
import HaditsBrowser from "./hadits-browser";

export default async function HaditsPage() {
  const kitabList = await prisma.periawayat.findMany({
  // const kitabList = await prisma.periawayat.findMany({
    select: {
      id: true,
      nama_kitab: true,
      status: true,
    },
    orderBy: {
      nama_kitab: "asc",
    },
  });

  return <HaditsBrowser kitabList={kitabList} />;
}

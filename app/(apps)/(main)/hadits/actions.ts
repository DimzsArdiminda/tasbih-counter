"use server";

import { prisma } from "@/lib/prisma";

export type HaditsItem = {
  id: string;
  arab: string;
  terjemah: string;
};

export async function getHaditsByKitab(kitabId: string): Promise<HaditsItem[]> {
  const kitab = await prisma.periawayat.findUnique({
    where: { id: kitabId },
    include: {
      kitab: true,
      kitabA: true,
      kitabS: true,
      kitabM: true,
      kitabRA: true,
      kitabRS: true,
      kitabB: true,
      kitabMM: true,
      kitabAA: true,
      kitabIM: true,
      kitabSN: true,
      kitabST: true,
    },
  });

  if (!kitab) return [];

  return [
    ...kitab.kitab,
    ...kitab.kitabA,
    ...kitab.kitabS,
    ...kitab.kitabM,
    ...kitab.kitabRA,
    ...kitab.kitabRS,
    ...kitab.kitabB,
    ...kitab.kitabMM,
    ...kitab.kitabAA,
    ...kitab.kitabIM,
    ...kitab.kitabSN,
    ...kitab.kitabST,
  ].map(({ id, arab, terjemah }) => ({ id, arab, terjemah }));
}

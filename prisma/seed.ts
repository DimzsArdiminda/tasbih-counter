import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const userTarget1 = await prisma.countTarget.upsert({
    where: {
      id: "757a5694-0db3-4d5b-b7fa-5e82e417bcf5",
    },
    update: {},
    create: {
      id: "757a5694-0db3-4d5b-b7fa-5e82e417bcf5",
      target: 33,
    },
  });

  const userTarget2 = await prisma.countTarget.upsert({
    where: {
      id: "ca2a932d-e241-48b2-84d7-310c6e428935",
    },
    update: {},
    create: {
      id: "ca2a932d-e241-48b2-84d7-310c6e428935",
      target: 99,
    },
  });
  
  const userTarget3 = await prisma.countTarget.upsert({
    where: {
      id: "e1e1f37a-d559-404f-a1ab-05e4b54716cf",
    },
    update: {},
    create: {
      id: "e1e1f37a-d559-404f-a1ab-05e4b54716cf",
      target: 100,
    },
  });

  const userTarget4 = await prisma.countTarget.upsert({
    where: {
      id: "a5f72d93-71cf-4189-9619-83f76d9e7a71",
    },
    update: {},
    create: {
      id: "a5f72d93-71cf-4189-9619-83f76d9e7a71",
      target: 1000,
    },
  });

  const user1 = await prisma.user.upsert({
    where: {
      email: "user@mail.com"
    },
    update:{},
    create: {
      email: "user@mail.com",
      name: "Test User",
      password: await bcrypt.hash("password", 10),
    },
  });

  const dzikir1 = await prisma.dzikir.upsert({
    where: {
      id: "10477e39-a454-4234-ac4e-8609552c7262",
    },
    update: {},
    create: {
      id: "10477e39-a454-4234-ac4e-8609552c7262",
      name: "Subhanallah",
      arabic: "سُبْحَانَ اللّٰهِ",
      translation: "Maha Suci Allah",
      targetDefault: 33,
    },
  });
 
  const dzikir2 = await prisma.dzikir.upsert({
    where: {
      id: "49f24837-3c0d-4343-ab6b-885f984bfeff",
    },
    update: {},
    create: {
      id: "49f24837-3c0d-4343-ab6b-885f984bfeff",
      name: "Alhamdulillah",
      arabic: "الْحَمْدُ لِلّٰهِ",
      translation: "Segala puji bagi Allah",
      targetDefault: 33,
    },
  });
  
  const dzikir3 = await prisma.dzikir.upsert({
    where: {
      id: "42152393-f390-4457-8db1-5a556c6cb0c4",
    },
    update: {},
    create: {
      id: "42152393-f390-4457-8db1-5a556c6cb0c4",
      name: "Allahu Akbar",
      arabic: "اللّٰهُ أَكْبَرُ",
      translation: "Allah Maha Besar",
      targetDefault: 33,
    },
  });

  const dzikir4 = await prisma.dzikir.upsert({
    where: {
      id: "4c49accd-9692-48ea-a8b1-cbef237f5a59",
    },
    update: {},
    create: {
      id: "4c49accd-9692-48ea-a8b1-cbef237f5a59",
      name: "Lailahaillallah",
      arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ",
      translation: "Tiada Tuhan selain Allah",
      targetDefault: 33,
    },
  });
  
  const dzikir5 = await prisma.dzikir.upsert({
    where: {
      id: "5f7a80f3-9137-48c6-a28d-67f190f18f56",
    },
    update: {},
    create: {
      id: "5f7a80f3-9137-48c6-a28d-67f190f18f56",
      name: "Astaghfirullah",
      arabic: "أَسْتَغْفِرُ اللّٰهَ",
      translation: "Aku memohon ampun kepada Allah",
      targetDefault: 33,
    },
  });
  
  const dzikir6 = await prisma.dzikir.upsert({
    where: {
      id: "19fb0753-6a83-4674-b2b3-c6af9d95632e",
    },
    update: {},
    create: {
      id: "19fb0753-6a83-4674-b2b3-c6af9d95632e",
      name: "Shalawat Nabi",
      arabic: "اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
      translation: "Ya Allah, berikanlah rahmat kepada Nabi Muhammad",
      targetDefault: 33,
    },
  });

  console.log("Seed data created:", dzikir1, dzikir2, dzikir3, dzikir4, dzikir5, dzikir6);
  console.log("Seed data created:", user1);
  console.log("Seed data created:", userTarget1, userTarget2, userTarget3, userTarget4);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

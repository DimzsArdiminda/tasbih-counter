import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {

  const user1 = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Test User",
      password: await bcrypt.hash("password", 10),
    },
  });

  const dzikir1 = await prisma.dzikir.create({
    data: {
      name: "Subhanallah",
      arabic: "سُبْحَانَ اللّٰهِ",
      translation: "Maha Suci Allah",
      targetDefault: 33,
    }
  });
 
  const dzikir2 = await prisma.dzikir.create({
    data: {
      name: "Alhamdulillah",
      arabic: "الْحَمْدُ لِلّٰهِ",
      translation: "Segala puji bagi Allah",
      targetDefault: 33,
    }
  });
  
  const dzikir3 = await prisma.dzikir.create({
    data: {
      name: "Allahu Akbar",
  arabic: "اللّٰهُ أَكْبَرُ",
      translation: "Allah Maha Besar",
      targetDefault: 33,
    }
  });

  const dzikir4 = await prisma.dzikir.create({
    data: {
      name: "Lailahaillallah",
      arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ",
      translation: "Tiada Tuhan selain Allah",
      targetDefault: 33,
    }
  });
  
  const dzikir5 = await prisma.dzikir.create({
    data: {
      name: "Astaghfirullah",
      arabic: "أَسْتَغْفِرُ اللّٰهَ",
      translation: "Aku memohon ampun kepada Allah",
      targetDefault: 33,
    }
  });
  
  const dzikir6 = await prisma.dzikir.create({
    data: {
      name: "Shalawat Nabi",
      arabic: "اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
      translation: "Ya Allah, berikanlah rahmat kepada Nabi Muhammad",
      targetDefault: 33,
    }
  });

  console.log("Seed data created:", dzikir1, dzikir2, dzikir3, dzikir4, dzikir5, dzikir6);
  console.log("Seed data created:", user1);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

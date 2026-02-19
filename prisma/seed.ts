import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Contoh seed data user
  const user1 = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Test User",
      password: await bcrypt.hash("password", 10),
    },
  });

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

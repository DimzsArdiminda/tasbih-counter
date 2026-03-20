"use server";

import { RegisterSchema } from "@/app/schemas/register";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(
  email: string,
  password: string,
  nama: string,
  confirmPassword: string,
) {
  try {
    const bodyParse = RegisterSchema.safeParse({
      email,
      password,
      nama,
      confirmPassword,
    });

    if (!bodyParse.success) {
      const errorMessages = bodyParse.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }

    if (password !== confirmPassword) {
      throw new Error("Password dan konfirmasi password harus sama");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: nama,
      },
    });

    return user;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Terjadi kesalahan saat memproses data",
    );
  }
}

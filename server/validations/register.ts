import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    nama: z.string().min(3, "Nama harus minimal 3 karakter"),
    password: z.string().min(6, "Password harus minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password harus minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
  });

export type RegisterDataType = z.infer<typeof RegisterSchema>;

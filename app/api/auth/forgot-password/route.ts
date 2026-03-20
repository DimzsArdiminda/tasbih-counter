import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: "Jika email terdaftar, link reset password akan dikirim" },
        { status: 200 },
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpires = new Date(Date.now() + 10);

    // Save token hash to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: resetTokenExpires,
      },
    });

    // Create reset link
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}&email=${email}`;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Reset Password - Do-Dzikir",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Reset Password Anda</h2>
          <p>Anda telah meminta untuk mereset password akun Do-Dzikir Anda.</p>
          <p>Klik link di bawah ini untuk melanjutkan:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 12px;">Link ini akan berlaku selama 10 menit.</p>
          <p style="color: #666; font-size: 12px;">Jika Anda tidak meminta reset password, silakan abaikan email ini.</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">© 2026 Do-Dzikir. All rights reserved.</p>
        </div>
      `,
      text: `
        Reset Password Anda
        
        Anda telah meminta untuk mereset password akun Do-Dzikir Anda.
        
        Klik link di bawah atau buka di browser:
        ${resetLink}
        
        Link ini akan berlaku selama 10 menit.
        
        Jika Anda tidak meminta reset password, silakan abaikan email ini.
      `,
    });

    return NextResponse.json(
      { message: "Jika email terdaftar, link reset password akan dikirim" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memproses permintaan" },
      { status: 500 },
    );
  }
}

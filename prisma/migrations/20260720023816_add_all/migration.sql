-- CreateEnum
CREATE TYPE "statusKitab" AS ENUM ('sahih', 'hasan', 'dhaif');

-- CreateTable
CREATE TABLE "periawayat" (
    "id" TEXT NOT NULL,
    "nama_kitab" TEXT NOT NULL,
    "status" "statusKitab" NOT NULL DEFAULT 'sahih',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periawayat_pkey" PRIMARY KEY ("id")
);

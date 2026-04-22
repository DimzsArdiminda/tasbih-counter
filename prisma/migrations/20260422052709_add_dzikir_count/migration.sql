-- CreateTable
CREATE TABLE "DzikirCount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dzikirId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DzikirCount_pkey" PRIMARY KEY ("id")
);

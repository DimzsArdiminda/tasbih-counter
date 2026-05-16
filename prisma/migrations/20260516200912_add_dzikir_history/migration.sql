-- CreateTable
CREATE TABLE "DzikirHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dhikrName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DzikirHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DzikirHistory_userId_createdAt_idx" ON "DzikirHistory"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "DzikirHistory" ADD CONSTRAINT "DzikirHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

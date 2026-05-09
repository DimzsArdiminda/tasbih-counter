-- CreateTable
CREATE TABLE "DzikirCount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dzikirId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DzikirCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountTarget" (
    "id" TEXT NOT NULL,
    "target" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "CountTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountTarget_userId_key" ON "CountTarget"("userId");

-- AddForeignKey
ALTER TABLE "CountTarget" ADD CONSTRAINT "CountTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

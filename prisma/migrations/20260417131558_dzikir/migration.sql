-- CreateTable
CREATE TABLE "Dzikir" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arabic" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "targetDefault" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Dzikir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDzikir" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dzikirId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDzikir_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDzikir_userId_dzikirId_key" ON "UserDzikir"("userId", "dzikirId");

-- AddForeignKey
ALTER TABLE "Dzikir" ADD CONSTRAINT "Dzikir_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDzikir" ADD CONSTRAINT "UserDzikir_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDzikir" ADD CONSTRAINT "UserDzikir_dzikirId_fkey" FOREIGN KEY ("dzikirId") REFERENCES "Dzikir"("id") ON DELETE CASCADE ON UPDATE CASCADE;

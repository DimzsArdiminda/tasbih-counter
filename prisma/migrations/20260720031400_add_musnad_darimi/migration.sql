-- CreateTable
CREATE TABLE "musnad_darimi" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "musnad_darimi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "musnad_darimi" ADD CONSTRAINT "musnad_darimi_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

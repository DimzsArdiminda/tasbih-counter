-- CreateTable
CREATE TABLE "musnad_ahmad" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "musnad_ahmad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musnad_syafii" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "musnad_syafii_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muwatoh_malik" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "muwatoh_malik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riyadhus_shalihin_arab" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "riyadhus_shalihin_arab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riyadhus_shalihin" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "riyadhus_shalihin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sahih_bukhori" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sahih_bukhori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sahih_muslim" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sahih_muslim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sunan_abu_daud" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sunan_abu_daud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sunan_ibnu_majah" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sunan_ibnu_majah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sunan_nasai" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sunan_nasai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sunan_tirmidzi" (
    "id" TEXT NOT NULL,
    "kitabId" TEXT NOT NULL,
    "arab" TEXT NOT NULL,
    "terjemah" TEXT NOT NULL,

    CONSTRAINT "sunan_tirmidzi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "musnad_ahmad" ADD CONSTRAINT "musnad_ahmad_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "musnad_syafii" ADD CONSTRAINT "musnad_syafii_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muwatoh_malik" ADD CONSTRAINT "muwatoh_malik_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riyadhus_shalihin_arab" ADD CONSTRAINT "riyadhus_shalihin_arab_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riyadhus_shalihin" ADD CONSTRAINT "riyadhus_shalihin_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sahih_bukhori" ADD CONSTRAINT "sahih_bukhori_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sahih_muslim" ADD CONSTRAINT "sahih_muslim_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sunan_abu_daud" ADD CONSTRAINT "sunan_abu_daud_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sunan_ibnu_majah" ADD CONSTRAINT "sunan_ibnu_majah_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sunan_nasai" ADD CONSTRAINT "sunan_nasai_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sunan_tirmidzi" ADD CONSTRAINT "sunan_tirmidzi_kitabId_fkey" FOREIGN KEY ("kitabId") REFERENCES "periawayat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

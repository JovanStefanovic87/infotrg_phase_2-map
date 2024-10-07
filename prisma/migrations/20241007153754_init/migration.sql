/*
  Warnings:

  - You are about to drop the column `logo` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[latitude,longitude]` on the table `RetailStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `RetailStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `RetailStore` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('Small', 'Big', 'Premium', 'Sponsor');

-- DropIndex
DROP INDEX "Company_email_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logo",
ADD COLUMN     "logoId" INTEGER,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "responsiblePerson" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RetailStore" ADD COLUMN     "adType" "AdType",
ADD COLUMN     "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhoneConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSubscribedForAds" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "logoId" INTEGER,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LogoToRetailStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LogoToRetailStore_AB_unique" ON "_LogoToRetailStore"("A", "B");

-- CreateIndex
CREATE INDEX "_LogoToRetailStore_B_index" ON "_LogoToRetailStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "RetailStore_latitude_longitude_key" ON "RetailStore"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LogoToRetailStore" ADD CONSTRAINT "_LogoToRetailStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Logo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LogoToRetailStore" ADD CONSTRAINT "_LogoToRetailStore_B_fkey" FOREIGN KEY ("B") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

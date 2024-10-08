/*
  Warnings:

  - You are about to drop the column `addressDescription` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `cityPartId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `marketplaceId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coordinatesId` to the `RetailStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `RetailStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_addressId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_cityId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_cityPartId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_companyId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_countryId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_marketplaceId_fkey";

-- DropIndex
DROP INDEX "RetailStore_latitude_longitude_key";

-- DropIndex
DROP INDEX "RetailStore_name_idx";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressDescription",
DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "RetailStore" DROP COLUMN "cityId",
DROP COLUMN "cityPartId",
DROP COLUMN "companyId",
DROP COLUMN "countryId",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "marketplaceId",
ADD COLUMN     "coordinatesId" INTEGER NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ALTER COLUMN "addressId" DROP NOT NULL;

-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "cityPartId" INTEGER,
    "marketplaceId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "locationDescription" TEXT,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_countryId_cityId_cityPartId_marketplaceId_idx" ON "Location"("countryId", "cityId", "cityPartId", "marketplaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinates_latitude_longitude_key" ON "Coordinates"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityPartId_fkey" FOREIGN KEY ("cityPartId") REFERENCES "CityPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "Marketplace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

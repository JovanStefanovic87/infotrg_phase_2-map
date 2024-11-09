/*
  Warnings:

  - You are about to drop the column `cityPartId` on the `Advertising` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Advertising` table. All the data in the column will be lost.
  - You are about to drop the column `marketplaceId` on the `Advertising` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `cityPartId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `marketplaceId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `cityPartId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `marketplaceId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the `CityPart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marketplace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stateId` to the `Advertising` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countyId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `RetailStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Advertising" DROP CONSTRAINT "Advertising_cityPartId_fkey";

-- DropForeignKey
ALTER TABLE "Advertising" DROP CONSTRAINT "Advertising_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Advertising" DROP CONSTRAINT "Advertising_marketplaceId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CityPart" DROP CONSTRAINT "CityPart_cityId_fkey";

-- DropForeignKey
ALTER TABLE "CityPart" DROP CONSTRAINT "CityPart_iconId_fkey";

-- DropForeignKey
ALTER TABLE "CityPart" DROP CONSTRAINT "CityPart_labelId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_iconId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_labelId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_cityPartId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_marketplaceId_fkey";

-- DropForeignKey
ALTER TABLE "Marketplace" DROP CONSTRAINT "Marketplace_cityPartId_fkey";

-- DropForeignKey
ALTER TABLE "Marketplace" DROP CONSTRAINT "Marketplace_iconId_fkey";

-- DropForeignKey
ALTER TABLE "Marketplace" DROP CONSTRAINT "Marketplace_labelId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_cityPartId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_countryId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_marketplaceId_fkey";

-- DropIndex
DROP INDEX "Location_countryId_cityId_cityPartId_marketplaceId_idx";

-- AlterTable
ALTER TABLE "Advertising" DROP COLUMN "cityPartId",
DROP COLUMN "countryId",
DROP COLUMN "marketplaceId",
ADD COLUMN     "countyId" INTEGER,
ADD COLUMN     "stateId" INTEGER NOT NULL,
ADD COLUMN     "suburbId" INTEGER,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "countryId",
ADD COLUMN     "countyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "cityPartId",
DROP COLUMN "countryId",
DROP COLUMN "marketplaceId",
ADD COLUMN     "countyId" INTEGER,
ADD COLUMN     "stateId" INTEGER NOT NULL,
ADD COLUMN     "suburbId" INTEGER,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RetailStore" DROP COLUMN "cityPartId",
DROP COLUMN "countryId",
DROP COLUMN "marketplaceId",
ADD COLUMN     "countyId" INTEGER,
ADD COLUMN     "stateId" INTEGER NOT NULL,
ADD COLUMN     "suburbId" INTEGER,
ALTER COLUMN "cityId" DROP NOT NULL;

-- DropTable
DROP TABLE "CityPart";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Marketplace";

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "labelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iconId" INTEGER,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "County" (
    "id" SERIAL NOT NULL,
    "labelId" INTEGER NOT NULL,
    "postCode" TEXT,
    "stateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iconId" INTEGER,

    CONSTRAINT "County_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suburb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iconId" INTEGER,
    "labelId" INTEGER NOT NULL,

    CONSTRAINT "Suburb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_stateId_countyId_cityId_suburbId_idx" ON "Location"("stateId", "countyId", "cityId", "suburbId");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "County" ADD CONSTRAINT "County_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suburb" ADD CONSTRAINT "Suburb_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suburb" ADD CONSTRAINT "Suburb_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suburb" ADD CONSTRAINT "Suburb_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_suburbId_fkey" FOREIGN KEY ("suburbId") REFERENCES "Suburb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_suburbId_fkey" FOREIGN KEY ("suburbId") REFERENCES "Suburb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "County"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_suburbId_fkey" FOREIGN KEY ("suburbId") REFERENCES "Suburb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

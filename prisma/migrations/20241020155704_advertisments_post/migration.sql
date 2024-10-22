/*
  Warnings:

  - You are about to drop the column `advertisingId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `advertisingId` on the `CityPart` table. All the data in the column will be lost.
  - You are about to drop the column `advertisingId` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `advertisingId` on the `Marketplace` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "AdType" ADD VALUE 'None';

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_advertisingId_fkey";

-- DropForeignKey
ALTER TABLE "CityPart" DROP CONSTRAINT "CityPart_advertisingId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_advertisingId_fkey";

-- DropForeignKey
ALTER TABLE "Marketplace" DROP CONSTRAINT "Marketplace_advertisingId_fkey";

-- AlterTable
ALTER TABLE "Advertising" ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "cityPartId" INTEGER,
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "marketplaceId" INTEGER;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "advertisingId";

-- AlterTable
ALTER TABLE "CityPart" DROP COLUMN "advertisingId";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "advertisingId";

-- AlterTable
ALTER TABLE "Marketplace" DROP COLUMN "advertisingId";

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_cityPartId_fkey" FOREIGN KEY ("cityPartId") REFERENCES "CityPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "Marketplace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

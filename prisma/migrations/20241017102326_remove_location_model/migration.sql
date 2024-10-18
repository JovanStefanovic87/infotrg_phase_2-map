/*
  Warnings:

  - Added the required column `cityId` to the `RetailStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `RetailStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_locationId_fkey";

-- DropIndex
DROP INDEX "City_labelId_countryId_key";

-- DropIndex
DROP INDEX "CityPart_labelId_cityId_key";

-- DropIndex
DROP INDEX "Marketplace_name_idx";

-- AlterTable
ALTER TABLE "RetailStore" ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "cityPartId" INTEGER,
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "marketplaceId" INTEGER,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_cityPartId_fkey" FOREIGN KEY ("cityPartId") REFERENCES "CityPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "Marketplace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

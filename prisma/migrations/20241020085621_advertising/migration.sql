/*
  Warnings:

  - You are about to drop the column `adType` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `isSubscribedForAds` on the `RetailStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "advertisingId" INTEGER;

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "advertisingId" INTEGER;

-- AlterTable
ALTER TABLE "CityPart" ADD COLUMN     "advertisingId" INTEGER;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "advertisingId" INTEGER;

-- AlterTable
ALTER TABLE "Marketplace" ADD COLUMN     "advertisingId" INTEGER;

-- AlterTable
ALTER TABLE "RetailStore" DROP COLUMN "adType",
DROP COLUMN "isSubscribedForAds";

-- CreateTable
CREATE TABLE "Advertising" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "adType" "AdType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMP(3) NOT NULL,
    "retailStoreId" INTEGER,

    CONSTRAINT "Advertising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdvertisingArticleCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdvertisingActivityCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdvertisingObjectTypeCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisingArticleCategories_AB_unique" ON "_AdvertisingArticleCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisingArticleCategories_B_index" ON "_AdvertisingArticleCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisingActivityCategories_AB_unique" ON "_AdvertisingActivityCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisingActivityCategories_B_index" ON "_AdvertisingActivityCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisingObjectTypeCategories_AB_unique" ON "_AdvertisingObjectTypeCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisingObjectTypeCategories_B_index" ON "_AdvertisingObjectTypeCategories"("B");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_advertisingId_fkey" FOREIGN KEY ("advertisingId") REFERENCES "Advertising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_advertisingId_fkey" FOREIGN KEY ("advertisingId") REFERENCES "Advertising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityPart" ADD CONSTRAINT "CityPart_advertisingId_fkey" FOREIGN KEY ("advertisingId") REFERENCES "Advertising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketplace" ADD CONSTRAINT "Marketplace_advertisingId_fkey" FOREIGN KEY ("advertisingId") REFERENCES "Advertising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertising" ADD CONSTRAINT "Advertising_retailStoreId_fkey" FOREIGN KEY ("retailStoreId") REFERENCES "RetailStore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingArticleCategories" ADD CONSTRAINT "_AdvertisingArticleCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertising"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingArticleCategories" ADD CONSTRAINT "_AdvertisingArticleCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingActivityCategories" ADD CONSTRAINT "_AdvertisingActivityCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertising"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingActivityCategories" ADD CONSTRAINT "_AdvertisingActivityCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingObjectTypeCategories" ADD CONSTRAINT "_AdvertisingObjectTypeCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertising"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertisingObjectTypeCategories" ADD CONSTRAINT "_AdvertisingObjectTypeCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

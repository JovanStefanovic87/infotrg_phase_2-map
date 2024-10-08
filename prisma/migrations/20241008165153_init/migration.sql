/*
  Warnings:

  - You are about to drop the column `addressId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `retailStoreTypeId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RetailStoreType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RetailStoreCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_addressId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_retailStoreTypeId_fkey";

-- DropForeignKey
ALTER TABLE "_RetailStoreCategories" DROP CONSTRAINT "_RetailStoreCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_RetailStoreCategories" DROP CONSTRAINT "_RetailStoreCategories_B_fkey";

-- AlterTable
ALTER TABLE "RetailStore" DROP COLUMN "addressId",
DROP COLUMN "retailStoreTypeId",
ALTER COLUMN "coordinatesId" DROP NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "RetailStoreType";

-- DropTable
DROP TABLE "_RetailStoreCategories";

-- CreateTable
CREATE TABLE "_RetailStoreArticleCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RetailStoreActivityCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RetailStoreObjectTypeCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RetailStoreArticleCategories_AB_unique" ON "_RetailStoreArticleCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_RetailStoreArticleCategories_B_index" ON "_RetailStoreArticleCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RetailStoreActivityCategories_AB_unique" ON "_RetailStoreActivityCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_RetailStoreActivityCategories_B_index" ON "_RetailStoreActivityCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RetailStoreObjectTypeCategories_AB_unique" ON "_RetailStoreObjectTypeCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_RetailStoreObjectTypeCategories_B_index" ON "_RetailStoreObjectTypeCategories"("B");

-- AddForeignKey
ALTER TABLE "_RetailStoreArticleCategories" ADD CONSTRAINT "_RetailStoreArticleCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreArticleCategories" ADD CONSTRAINT "_RetailStoreArticleCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreActivityCategories" ADD CONSTRAINT "_RetailStoreActivityCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreActivityCategories" ADD CONSTRAINT "_RetailStoreActivityCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreObjectTypeCategories" ADD CONSTRAINT "_RetailStoreObjectTypeCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreObjectTypeCategories" ADD CONSTRAINT "_RetailStoreObjectTypeCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

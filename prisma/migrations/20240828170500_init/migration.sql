/*
  Warnings:

  - You are about to drop the `CategoryParent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryParent" DROP CONSTRAINT "CategoryParent_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryParent" DROP CONSTRAINT "CategoryParent_parentId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "CategoryParent";

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

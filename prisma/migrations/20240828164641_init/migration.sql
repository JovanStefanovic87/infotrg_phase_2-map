/*
  Warnings:

  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropIndex
DROP INDEX "Category_parentId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "CategoryParent" (
    "categoryId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "CategoryParent_pkey" PRIMARY KEY ("categoryId","parentId")
);

-- AddForeignKey
ALTER TABLE "CategoryParent" ADD CONSTRAINT "CategoryParent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryParent" ADD CONSTRAINT "CategoryParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

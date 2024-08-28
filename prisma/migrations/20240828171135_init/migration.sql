/*
  Warnings:

  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropIndex
DROP INDEX "Category_labelId_idx";

-- DropIndex
DROP INDEX "Category_parentId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "ParentCategory" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "ParentCategory_pkey" PRIMARY KEY ("parentId","childId")
);

-- AddForeignKey
ALTER TABLE "ParentCategory" ADD CONSTRAINT "ParentCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentCategory" ADD CONSTRAINT "ParentCategory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

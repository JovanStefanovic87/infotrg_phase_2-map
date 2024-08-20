/*
  Warnings:

  - You are about to drop the column `iconId` on the `Label` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iconId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_iconId_fkey";

-- DropIndex
DROP INDEX "Label_iconId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "iconId" INTEGER;

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "iconId";

-- CreateIndex
CREATE UNIQUE INDEX "Category_iconId_key" ON "Category"("iconId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

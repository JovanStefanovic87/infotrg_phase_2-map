/*
  Warnings:

  - You are about to drop the column `iconId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_iconId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_labelId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "iconId",
ADD COLUMN     "iconUrl" TEXT;

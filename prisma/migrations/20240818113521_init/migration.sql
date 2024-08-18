/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `translation` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_categoryId_fkey";

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "categoryId",
DROP COLUMN "name",
ADD COLUMN     "translation" TEXT NOT NULL;

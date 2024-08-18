/*
  Warnings:

  - You are about to drop the column `languageId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `CategoryDescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Synonym` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `names` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_languageId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryDescription" DROP CONSTRAINT "CategoryDescription_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryName" DROP CONSTRAINT "CategoryName_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Synonym" DROP CONSTRAINT "Synonym_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "languageId",
ADD COLUMN     "description" JSONB,
ADD COLUMN     "names" JSONB NOT NULL,
ADD COLUMN     "synonyms" JSONB;

-- DropTable
DROP TABLE "CategoryDescription";

-- DropTable
DROP TABLE "CategoryName";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Synonym";

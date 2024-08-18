/*
  Warnings:

  - You are about to drop the column `labelId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Label` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_labelId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "labelId";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Synonym" (
    "id" SERIAL NOT NULL,
    "translationId" INTEGER NOT NULL,
    "synonym" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Synonym_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

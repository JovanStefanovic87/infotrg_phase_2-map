/*
  Warnings:

  - A unique constraint covering the columns `[labelId,languageId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Translation_labelId_idx";

-- DropIndex
DROP INDEX "Translation_languageId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Translation_labelId_languageId_key" ON "Translation"("labelId", "languageId");

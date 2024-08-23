/*
  Warnings:

  - Made the column `name` on table `Label` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Synonym" DROP CONSTRAINT "Synonym_translationId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_labelId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_languageId_fkey";

-- AlterTable
ALTER TABLE "Label" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Category_labelId_idx" ON "Category"("labelId");

-- CreateIndex
CREATE INDEX "Icon_name_idx" ON "Icon"("name");

-- CreateIndex
CREATE INDEX "Label_name_idx" ON "Label"("name");

-- CreateIndex
CREATE INDEX "Language_code_idx" ON "Language"("code");

-- CreateIndex
CREATE INDEX "Synonym_translationId_idx" ON "Synonym"("translationId");

-- CreateIndex
CREATE INDEX "Translation_labelId_idx" ON "Translation"("labelId");

-- CreateIndex
CREATE INDEX "Translation_languageId_idx" ON "Translation"("languageId");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

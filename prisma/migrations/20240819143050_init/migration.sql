/*
  Warnings:

  - A unique constraint covering the columns `[iconId]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "iconId" INTEGER;

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_iconId_key" ON "Label"("iconId");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

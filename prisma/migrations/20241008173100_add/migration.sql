/*
  Warnings:

  - You are about to drop the column `address` on the `Marketplace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "Marketplace" DROP COLUMN "address";

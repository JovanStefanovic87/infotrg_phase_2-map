/*
  Warnings:

  - You are about to drop the column `homeDelivery` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `logoId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the column `storeTypeId` on the `RetailStore` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkingTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LogoToRetailStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Logo" DROP CONSTRAINT "Logo_companyId_fkey";

-- DropForeignKey
ALTER TABLE "RetailStore" DROP CONSTRAINT "RetailStore_storeTypeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkingTime" DROP CONSTRAINT "WorkingTime_retailStoreId_fkey";

-- DropForeignKey
ALTER TABLE "_LogoToRetailStore" DROP CONSTRAINT "_LogoToRetailStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_LogoToRetailStore" DROP CONSTRAINT "_LogoToRetailStore_B_fkey";

-- AlterTable
ALTER TABLE "RetailStore" DROP COLUMN "homeDelivery",
DROP COLUMN "logoId",
DROP COLUMN "storeTypeId",
ADD COLUMN     "retailStoreTypeId" INTEGER;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Logo";

-- DropTable
DROP TABLE "StoreType";

-- DropTable
DROP TABLE "WorkingTime";

-- DropTable
DROP TABLE "_LogoToRetailStore";

-- DropEnum
DROP TYPE "HomeDelivery";

-- CreateTable
CREATE TABLE "RetailStoreType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "RetailStoreType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RetailStoreType_type_key" ON "RetailStoreType"("type");

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_retailStoreTypeId_fkey" FOREIGN KEY ("retailStoreTypeId") REFERENCES "RetailStoreType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

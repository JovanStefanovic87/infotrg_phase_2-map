/*
  Warnings:

  - Changed the type of `adType` on the `Advertising` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `cityId` on table `Advertising` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `Advertising` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Advertising" DROP COLUMN "adType",
ADD COLUMN     "adType" TEXT NOT NULL,
ALTER COLUMN "cityId" SET NOT NULL,
ALTER COLUMN "countryId" SET NOT NULL;

-- DropEnum
DROP TYPE "AdType";

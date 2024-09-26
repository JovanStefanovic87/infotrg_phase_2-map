/*
  Warnings:

  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CityPart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labelId,countryId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labelId,cityId]` on the table `CityPart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labelId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelId` to the `CityPart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelId` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "City_name_countryId_key";

-- DropIndex
DROP INDEX "CityPart_name_cityId_key";

-- DropIndex
DROP INDEX "Country_name_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "name",
ADD COLUMN     "labelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CityPart" DROP COLUMN "name",
ADD COLUMN     "labelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "name",
ADD COLUMN     "labelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_labelId_countryId_key" ON "City"("labelId", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "CityPart_labelId_cityId_key" ON "CityPart"("labelId", "cityId");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityPart" ADD CONSTRAINT "CityPart_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

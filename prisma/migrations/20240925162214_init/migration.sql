-- AlterTable
ALTER TABLE "City" ADD COLUMN     "iconId" INTEGER;

-- AlterTable
ALTER TABLE "CityPart" ADD COLUMN     "iconId" INTEGER;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "iconId" INTEGER;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityPart" ADD CONSTRAINT "CityPart_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

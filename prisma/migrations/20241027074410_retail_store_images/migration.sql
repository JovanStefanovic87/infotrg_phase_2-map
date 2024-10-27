-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "retailStoreId" INTEGER;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_retailStoreId_fkey" FOREIGN KEY ("retailStoreId") REFERENCES "RetailStore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

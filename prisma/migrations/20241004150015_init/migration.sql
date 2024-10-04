-- CreateEnum
CREATE TYPE "HomeDelivery" AS ENUM ('Yes', 'No', 'Conditional');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "businessActivity" TEXT NOT NULL,
    "countryFounded" TEXT NOT NULL,
    "cityFounded" TEXT NOT NULL,
    "responsiblePerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "aboutCompany" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailStore" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "storeTypeId" INTEGER,
    "addressId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "homeDelivery" "HomeDelivery" NOT NULL,
    "companyId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "cityPartId" INTEGER,
    "marketplaceId" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "StoreType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "addressDescription" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "storeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingTime" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,
    "retailStoreId" INTEGER NOT NULL,

    CONSTRAINT "WorkingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RetailStoreCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE INDEX "RetailStore_name_idx" ON "RetailStore"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StoreType_type_key" ON "StoreType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_RetailStoreCategories_AB_unique" ON "_RetailStoreCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_RetailStoreCategories_B_index" ON "_RetailStoreCategories"("B");

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_storeTypeId_fkey" FOREIGN KEY ("storeTypeId") REFERENCES "StoreType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_cityPartId_fkey" FOREIGN KEY ("cityPartId") REFERENCES "CityPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailStore" ADD CONSTRAINT "RetailStore_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "Marketplace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "RetailStore"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_retailStoreId_fkey" FOREIGN KEY ("retailStoreId") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreCategories" ADD CONSTRAINT "_RetailStoreCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RetailStoreCategories" ADD CONSTRAINT "_RetailStoreCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "RetailStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

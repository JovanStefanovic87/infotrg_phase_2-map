-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapMarker" (
    "id" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "MapMarker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "labelId" INTEGER NOT NULL,
    "iconId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentCategory" (
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "ParentCategory_pkey" PRIMARY KEY ("parentId","childId")
);

-- CreateTable
CREATE TABLE "RelatedCategory" (
    "categoryId" INTEGER NOT NULL,
    "relatedId" INTEGER NOT NULL,

    CONSTRAINT "RelatedCategory_pkey" PRIMARY KEY ("categoryId","relatedId")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "labelId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Synonym" (
    "id" SERIAL NOT NULL,
    "translationId" INTEGER NOT NULL,
    "synonym" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Synonym_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE INDEX "Language_code_idx" ON "Language"("code");

-- CreateIndex
CREATE INDEX "Label_name_idx" ON "Label"("name");

-- CreateIndex
CREATE INDEX "Icon_name_idx" ON "Icon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_labelId_languageId_key" ON "Translation"("labelId", "languageId");

-- CreateIndex
CREATE INDEX "Synonym_translationId_idx" ON "Synonym"("translationId");

-- AddForeignKey
ALTER TABLE "MapMarker" ADD CONSTRAINT "MapMarker_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentCategory" ADD CONSTRAINT "ParentCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentCategory" ADD CONSTRAINT "ParentCategory_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCategory" ADD CONSTRAINT "RelatedCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedCategory" ADD CONSTRAINT "RelatedCategory_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

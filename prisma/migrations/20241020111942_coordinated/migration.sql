/*
  Warnings:

  - You are about to alter the column `latitude` on the `Coordinates` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `longitude` on the `Coordinates` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Coordinates" ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER;

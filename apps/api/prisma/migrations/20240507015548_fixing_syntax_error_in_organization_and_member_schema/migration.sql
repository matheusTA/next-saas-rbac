/*
  Warnings:

  - You are about to drop the column `shouldAttachUserByDomain` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "shouldAttachUserByDomain",
ADD COLUMN     "shouldAttachUsersByDomain" BOOLEAN NOT NULL DEFAULT false;

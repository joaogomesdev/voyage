/*
  Warnings:

  - A unique constraint covering the columns `[authUserid]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "authUserid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUserid_key" ON "Student"("authUserid");

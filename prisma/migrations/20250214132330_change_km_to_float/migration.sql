/*
  Warnings:

  - You are about to alter the column `km` on the `motos` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `motos` MODIFY `km` DOUBLE NOT NULL;

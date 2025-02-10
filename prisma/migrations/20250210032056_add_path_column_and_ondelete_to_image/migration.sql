/*
  Warnings:

  - Added the required column `path` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_moto_id_fkey`;

-- DropIndex
DROP INDEX `images_moto_id_fkey` ON `images`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `path` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_moto_id_fkey` FOREIGN KEY (`moto_id`) REFERENCES `motos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

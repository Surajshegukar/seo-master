/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `magazine` DROP FOREIGN KEY `Magazine_auther_id_fkey`;

-- DropIndex
DROP INDEX `Magazine_auther_id_fkey` ON `magazine`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Auther` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL,
    `image` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `short_description` TEXT NULL,
    `description` TEXT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Magazine` ADD CONSTRAINT `Magazine_auther_id_fkey` FOREIGN KEY (`auther_id`) REFERENCES `Auther`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

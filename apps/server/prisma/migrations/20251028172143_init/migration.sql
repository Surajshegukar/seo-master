-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
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

-- CreateTable
CREATE TABLE `Magazine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `magazine_name` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NULL,
    `publish_date` DATETIME(3) NULL,
    `auther_id` INTEGER NULL,
    `short_description` TEXT NULL,
    `description` TEXT NULL,
    `duration` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Podcast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `podcast_name` VARCHAR(191) NOT NULL,
    `publish_date` DATETIME(3) NULL,
    `duration` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_on` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Magazine` ADD CONSTRAINT `Magazine_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Magazine` ADD CONSTRAINT `Magazine_auther_id_fkey` FOREIGN KEY (`auther_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `profile_image` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `sub_district` VARCHAR(191) NULL,
    `post_code` VARCHAR(191) NOT NULL,
    `contact_name` VARCHAR(191) NULL,
    `contact_number` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `contacts_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `en_title` VARCHAR(191) NULL,
    `th_title` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_active` BOOLEAN NULL DEFAULT true,
    `en_description` VARCHAR(191) NULL,
    `th_description` VARCHAR(191) NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `book_image` VARCHAR(191) NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expiredAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `en_title` VARCHAR(191) NULL,
    `th_title` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_active` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baskets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `basket_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `basket_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `basket_id` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `province` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `sub_district` VARCHAR(191) NULL,
    `post_code` VARCHAR(191) NOT NULL,
    `contact_name` VARCHAR(191) NULL,
    `contact_number` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categorys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prices` ADD CONSTRAINT `prices_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baskets` ADD CONSTRAINT `baskets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `basket_items` ADD CONSTRAINT `basket_items_basket_id_fkey` FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `basket_items` ADD CONSTRAINT `basket_items_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_basket_id_fkey` FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

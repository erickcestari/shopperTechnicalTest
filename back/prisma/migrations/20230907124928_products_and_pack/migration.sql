-- CreateTable
CREATE TABLE `products` (
    `code` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cost_price` DOUBLE NOT NULL,
    `sales_price` DOUBLE NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packs` (
    `id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `pack_id` BIGINT NOT NULL,
    `qty` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packs` ADD CONSTRAINT `packs_pack_id_fkey` FOREIGN KEY (`pack_id`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packs` ADD CONSTRAINT `packs_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

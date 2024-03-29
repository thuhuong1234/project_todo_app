/*
  Warnings:

  - You are about to drop the `reviews_of_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reviews_of_user` DROP FOREIGN KEY `reviews_of_user_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews_of_user` DROP FOREIGN KEY `reviews_of_user_reviewerId_fkey`;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `reviewerId` INTEGER NULL;

-- DropTable
DROP TABLE `reviews_of_user`;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

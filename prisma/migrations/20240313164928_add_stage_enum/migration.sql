-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `stage` ENUM('Todo', 'InProgress', 'Review', 'Testing', 'Done') NOT NULL DEFAULT 'Todo';

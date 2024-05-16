CREATE TABLE `visits` (
	`id` text PRIMARY KEY NOT NULL,
	`linkId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`meta` text,
	FOREIGN KEY (`linkId`) REFERENCES `urls`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visits_id_unique` ON `visits` (`id`);
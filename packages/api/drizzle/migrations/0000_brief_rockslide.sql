CREATE TABLE `urls` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `urls_id_unique` ON `urls` (`id`);
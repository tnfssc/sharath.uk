CREATE TABLE `viewCount` (
	`name` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `viewCount_name_unique` ON `viewCount` (`name`);
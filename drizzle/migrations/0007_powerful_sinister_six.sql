ALTER TABLE "clients" ALTER COLUMN "user_id" SET DATA TYPE varchar(26);--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "user_id" SET DATA TYPE varchar(26);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "user_id" SET DATA TYPE varchar(26);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(26);
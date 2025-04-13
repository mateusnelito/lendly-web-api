ALTER TABLE "clients" DROP CONSTRAINT "clients_phone_unique";--> statement-breakpoint
DROP INDEX "clients_user_id_idx";--> statement-breakpoint
DROP INDEX "clients_user_id_email_idx";--> statement-breakpoint
DROP INDEX "clients_user_id_phone_idx";--> statement-breakpoint
DROP INDEX "loans_client_id_idx";--> statement-breakpoint
DROP INDEX "loans_user_id_idx";--> statement-breakpoint
DROP INDEX "loans_base_due_date_idx";--> statement-breakpoint
DROP INDEX "loans_is_paid_idx";--> statement-breakpoint
DROP INDEX "loans_user_id_is_paid_idx";--> statement-breakpoint
DROP INDEX "user_is_deleted_idx";--> statement-breakpoint
CREATE INDEX "clients_user_id_index" ON "clients" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "loans_client_id_index" ON "loans" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "loans_user_id_index" ON "loans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "loans_base_due_date_index" ON "loans" USING btree ("base_due_date");--> statement-breakpoint
CREATE INDEX "loans_is_paid_index" ON "loans" USING btree ("is_paid");--> statement-breakpoint
CREATE INDEX "loans_user_id_is_paid_index" ON "loans" USING btree ("user_id","is_paid");--> statement-breakpoint
CREATE INDEX "users_is_deleted_index" ON "users" USING btree ("is_deleted");--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_email_unique" UNIQUE("user_id","email");--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_phone_unique" UNIQUE("user_id","phone");
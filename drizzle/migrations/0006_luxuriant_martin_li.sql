DROP INDEX "loan_id_idx";--> statement-breakpoint
DROP INDEX "payments_date_idx";--> statement-breakpoint
CREATE INDEX "payments_loan_id_index" ON "payments" USING btree ("loan_id");--> statement-breakpoint
CREATE INDEX "payments_created_at_index" ON "payments" USING btree ("created_at");
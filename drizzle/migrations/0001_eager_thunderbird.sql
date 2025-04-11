CREATE TABLE "clients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar(24) NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(255),
	"phone" varchar(9) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "clients_email_unique" UNIQUE("email"),
	CONSTRAINT "clients_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "loans_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_id" integer NOT NULL,
	"user_id" varchar(24) NOT NULL,
	"amount_given" integer NOT NULL,
	"base_due_date" date NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"has_interest" boolean DEFAULT false NOT NULL,
	"interest_value_per_month" integer,
	"notes" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar(24),
	"loan_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id_deleted" TO "is_deleted";--> statement-breakpoint
DROP INDEX "user_is_deleted_idx";--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clients_user_id_idx" ON "clients" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "clients_user_id_email_idx" ON "clients" USING btree ("user_id","email");--> statement-breakpoint
CREATE INDEX "clients_user_id_phone_idx" ON "clients" USING btree ("user_id","phone");--> statement-breakpoint
CREATE INDEX "loans_client_id_idx" ON "loans" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "loans_user_id_idx" ON "loans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "loans_base_due_date_idx" ON "loans" USING btree ("base_due_date");--> statement-breakpoint
CREATE INDEX "loans_is_paid_idx" ON "loans" USING btree ("is_paid");--> statement-breakpoint
CREATE INDEX "loans_user_id_is_paid_idx" ON "loans" USING btree ("user_id","is_paid");--> statement-breakpoint
CREATE INDEX "loan_id_idx" ON "payments" USING btree ("loan_id");--> statement-breakpoint
CREATE INDEX "payments_date_idx" ON "payments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_is_deleted_idx" ON "users" USING btree ("is_deleted");
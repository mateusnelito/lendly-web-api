import { relations } from 'drizzle-orm';
import {
	index,
	integer,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { loans } from './loans';
import { users } from './users';

export const payments = pgTable(
	'payments',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		userId: varchar('user_id', { length: 24 })
			.notNull()
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		loanId: integer('loan_id')
			.notNull()
			.references(() => loans.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		amount: integer('amount').notNull(),
		date: timestamp('created_at').notNull().defaultNow(),
		deletedAt: timestamp('deleted_at'),
	},
	t => [index().on(t.loanId), index().on(t.date)]
);

export const paymentsRelations = relations(payments, ({ one }) => ({
	loan: one(loans, {
		fields: [payments.loanId],
		references: [loans.id],
	}),
	user: one(users, {
		fields: [payments.userId],
		references: [users.id],
	}),
}));

import { relations } from 'drizzle-orm';
import {
	boolean,
	date,
	index,
	integer,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { clients } from './clients';
import { payments } from './payments';
import { users } from './users';

export const loans = pgTable(
	'loans',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		clientId: integer('client_id')
			.notNull()
			.references(() => clients.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		userId: varchar('user_id', { length: 26 })
			.notNull()
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		amountGiven: integer('amount_given').notNull(),
		baseDueDate: date('base_due_date').notNull(),
		isPaid: boolean('is_paid').notNull().default(false),
		hasInterest: boolean('has_interest').notNull().default(false),
		interestValuePerMonth: integer('interest_value_per_month'),
		notes: varchar('notes', { length: 100 }),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
	},
	t => [
		index().on(t.clientId),
		index().on(t.userId),
		index().on(t.baseDueDate),
		index().on(t.isPaid),
		index().on(t.userId, t.isPaid),
	]
);

export const loansRelations = relations(loans, ({ one, many }) => ({
	client: one(clients, {
		fields: [loans.clientId],
		references: [clients.id],
	}),
	user: one(users, {
		fields: [loans.userId],
		references: [users.id],
	}),
	payments: many(payments),
}));

import { relations } from 'drizzle-orm';
import {
	index,
	integer,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { unique } from 'drizzle-orm/pg-core';
import { loans } from './loans';
import { users } from './users';

export const clients = pgTable(
	'clients',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		userId: varchar('user_id', { length: 24 })
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		name: varchar('name', { length: 50 }).notNull(),
		email: varchar('email', { length: 255 }),
		phone: varchar('phone', { length: 9 }).notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at'),
	},
	t => [
		index().on(t.userId),
		unique().on(t.userId, t.email),
		unique().on(t.userId, t.phone),
	]
);

export const clientsRelations = relations(clients, ({ one, many }) => ({
	user: one(users, {
		fields: [clients.userId],
		references: [users.id],
	}),
	loans: many(loans),
}));

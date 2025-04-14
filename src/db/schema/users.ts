import { relations } from 'drizzle-orm';
import {
	boolean,
	index,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';
import { clients } from './clients';
import { loans } from './loans';
import { payments } from './payments';

export const users = pgTable(
	'users',
	{
		id: varchar('id', { length: 26 })
			.primaryKey()
			.$defaultFn(() => ulid()),
		name: varchar('name', { length: 50 }).notNull(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		isDeleted: boolean('is_deleted').notNull().default(false),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
	},
	t => [index().on(t.isDeleted)]
);

export const usersRelations = relations(users, ({ many }) => ({
	clients: many(clients),
	loans: many(loans),
	payments: many(payments),
}));

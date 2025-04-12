import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema/users';

export async function findUserByEmail(email: string) {
	const [user] = await db
		.select({
			id: users.id,
			passwordHash: users.passwordHash,
		})
		.from(users)
		.where(and(eq(users.email, email), eq(users.isDeleted, false)))
		.limit(1);

	return user;
}

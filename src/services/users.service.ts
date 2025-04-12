import { and, eq, ne } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema/users';
import { RegisterUserBody } from '../schemas/users.schema';
import { hashPassword } from '../utils/bcrypt.util';

export async function findUserUserEmail(email: string, excludedId?: string) {
	const whereClause = excludedId
		? and(eq(users.email, email), ne(users.id, excludedId))
		: eq(users.email, email);

	const [user] = await db
		.select({ id: users.id, email: users.email })
		.from(users)
		.where(whereClause)
		.limit(1);

	return user;
}

export async function createUser(data: RegisterUserBody) {
	const { name, email, password } = data;

	const [user] = await db
		.insert(users)
		.values({
			name,
			email,
			passwordHash: await hashPassword(password),
		})
		.returning();

	return user;
}

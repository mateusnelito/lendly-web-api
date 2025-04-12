import { and, eq, ne } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema/users';
import { RegisterUserBody } from '../schemas/auth.schema';
import { throwInvalidUserCredentials } from '../utils/auth.util';
import { comparePassword, hashPassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { findUserByEmail } from './users.service';

export async function findUserUserEmail(email: string, excludedId?: string) {
	const whereClause = excludedId
		? and(
				eq(users.email, email),
				ne(users.id, excludedId),
				eq(users.isDeleted, false)
			)
		: and(eq(users.email, email), eq(users.isDeleted, false));

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

export async function authUser(email: string, password: string) {
	const user = await findUserByEmail(email);

	if (!user) throwInvalidUserCredentials();

	const isPasswordHash = await comparePassword(password, user.passwordHash);

	if (!isPasswordHash) throwInvalidUserCredentials();

	const { id } = user;

	const accessToken = generateToken({ user: { id } });

	return {
		accessToken,
		user: { id, email },
	};
}

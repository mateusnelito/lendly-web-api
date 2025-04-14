import { and, eq, ne } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema/users';
import { RegisterUserBody } from '../schemas/auth.schema';
import { UpdateMeBody } from '../schemas/me.schema';
import { hashPassword } from '../utils/bcrypt.util';

const SELECT_USER_FIELDS = {
	id: users.id,
	name: users.name,
	email: users.email,
	isDeleted: users.isDeleted,
	createdAt: users.createdAt,
	updatedAt: users.updatedAt,
};

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

export async function findUserEmail(email: string, excludedId?: string) {
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

export async function findUserById(id: string) {
	const [user] = await db
		.select(SELECT_USER_FIELDS)
		.from(users)
		.where(and(eq(users.id, id), eq(users.isDeleted, false)))
		.limit(1);

	return user;
}

export async function deleteUser(id: string) {
	const [user] = await db
		.update(users)
		.set({ isDeleted: true })
		.where(and(eq(users.id, id), eq(users.isDeleted, false)))
		.returning(SELECT_USER_FIELDS);

	return user;
}

export async function updateUser(id: string, data: UpdateMeBody) {
	const { name, email, password } = data;

	const passwordHash = password ? await hashPassword(password) : undefined;

	const [user] = await db
		.update(users)
		.set({ name, email, passwordHash })
		.where(and(eq(users.id, id), eq(users.isDeleted, false)))
		.returning(SELECT_USER_FIELDS);

	return user;
}

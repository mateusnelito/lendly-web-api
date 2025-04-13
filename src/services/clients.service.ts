import { and, eq, ne, or } from 'drizzle-orm';
import { db } from '../db';
import { clients } from '../db/schema/clients';
import { CreateClientBody, UpdateClientBody } from '../schemas/clients.schema';

const SELECT_CLIENT_FIELDS = {
	id: clients.id,
	name: clients.name,
	email: clients.email,
	phone: clients.phone,
	createdAt: clients.createdAt,
	updatedAt: clients.updatedAt,
};

export async function createClient(data: CreateClientBody, userId: string) {
	const [client] = await db
		.insert(clients)
		.values({ ...data, userId })
		.returning(SELECT_CLIENT_FIELDS);

	return client;
}

export interface FindClientByPhoneOrOptionalEmail {
	phone: string;
	userId: string;
	email?: string | null;
	excludedId?: number;
}

export async function findClientByPhoneOrOptionalEmail(
	params: FindClientByPhoneOrOptionalEmail
) {
	const { phone, userId, email, excludedId } = params;

	const orClauses = [eq(clients.phone, phone)];

	if (email) orClauses.push(eq(clients.email, email));

	const andClauses = [
		or(...orClauses),
		eq(clients.userId, userId),
		excludedId ? ne(clients.id, excludedId) : undefined,
	].filter(Boolean);

	const whereClause = and(...andClauses);

	const [client] = await db
		.select({ id: clients.id, email: clients.email, phone: clients.phone })
		.from(clients)
		.where(whereClause)
		.limit(1);

	return client;
}

export async function updateClient(id: number, data: UpdateClientBody) {
	const [client] = await db
		.update(clients)
		.set(data)
		.where(eq(clients.id, id))
		.returning(SELECT_CLIENT_FIELDS);

	return client;
}

export async function findClientById(id: number) {
	const [client] = await db
		.select(SELECT_CLIENT_FIELDS)
		.from(clients)
		.where(eq(clients.id, id))
		.limit(1);

	return client;
}

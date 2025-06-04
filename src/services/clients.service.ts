import { and, desc, eq, ne, or } from 'drizzle-orm';
import { db } from '../db';
import { clients } from '../db/schema/clients';
import { CreateClientBody } from '../schemas/clients/create.schema';
import { UpdateClientBody } from '../schemas/clients/update.schema';
import ClientError from '../utils/client-error.util';
import { SELECT_CLIENT_FIELDS } from '../utils/drizzle.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

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

export async function updateClient(
	id: number,
	data: UpdateClientBody,
	userId: string
) {
	const [client] = await db
		.update(clients)
		.set(data)
		.where(and(eq(clients.id, id), eq(clients.userId, userId)))
		.returning(SELECT_CLIENT_FIELDS);

	return client;
}

export async function findClientById(id: number, userId: string) {
	const [client] = await db
		.select(SELECT_CLIENT_FIELDS)
		.from(clients)
		.where(and(eq(clients.id, id), eq(clients.userId, userId)))
		.limit(1);

	return client;
}

export async function findClientByIdOrThrownError(id: number, userId: string) {
	// TODO: Add more fields or details to return
	const [client] = await db
		.select(SELECT_CLIENT_FIELDS)
		.from(clients)
		.where(and(eq(clients.id, id), eq(clients.userId, userId)))
		.limit(1);

	if (!client)
		throw new ClientError('Cliente não registrado.', HttpStatusCodes.NOT_FOUND);

	return client;
}

export async function findClients(userId: string) {
	const userClients = await db
		.select(SELECT_CLIENT_FIELDS)
		.from(clients)
		.where(eq(clients.userId, userId))
		.orderBy(desc(clients.id));

	return { clients: userClients };
}

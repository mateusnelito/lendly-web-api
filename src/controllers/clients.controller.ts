import { FastifyReply, FastifyRequest } from 'fastify';
import {
	ClientIdParams,
	CreateClientBody,
	GetClientsQueryString,
	UpdateClientBody,
} from '../schemas/clients.schema';
import {
	createClient,
	findClientByIdOrThrownError,
	findClients,
	updateClient,
} from '../services/clients.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensureClientContactsIsAvailable,
	ensureClientExists,
} from '../validators/clients.validator';

export async function createClientController(
	request: FastifyRequest<{ Body: CreateClientBody }>,
	reply: FastifyReply
) {
	const { id } = request.user;
	const { body } = request;

	await ensureClientContactsIsAvailable({ ...body, userId: id });

	const newClient = await createClient(body, id);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: 'success',
		data: newClient,
	});
}

export async function updateClientController(
	request: FastifyRequest<{ Params: ClientIdParams; Body: UpdateClientBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;
	const { body } = request;

	await ensureClientExists(id, userId);
	await ensureClientContactsIsAvailable({ ...body, userId, excludedId: id });

	const updatedClient = await updateClient(id, body, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: updatedClient,
	});
}

export async function getClientController(
	request: FastifyRequest<{ Params: ClientIdParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	const client = await findClientByIdOrThrownError(id, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: client,
	});
}

export async function getClientsController(
	request: FastifyRequest<{ Querystring: GetClientsQueryString }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { query } = request;

	const clients = await findClients(userId, query);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: clients,
	});
}

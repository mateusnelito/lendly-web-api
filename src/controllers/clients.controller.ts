import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateClientBody } from '../schemas/clients/create.schema';
import { GetClientParams } from '../schemas/clients/detail.schema';
import { GetClientsQuery } from '../schemas/clients/list.schema';
import {
	UpdateClientBody,
	UpdateClientParams,
} from '../schemas/clients/update.schema';
import {
	createClient,
	findClientByIdOrThrownError,
	findClients,
	updateClient,
} from '../services/clients.service';
import { ResponseStatus } from '../types/response-status.type';
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
		status: ResponseStatus.SUCCESS,
		data: newClient,
	});
}

export async function updateClientController(
	request: FastifyRequest<{
		Params: UpdateClientParams;
		Body: UpdateClientBody;
	}>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;
	const { body } = request;

	await ensureClientExists(id, userId);
	await ensureClientContactsIsAvailable({ ...body, userId, excludedId: id });

	const updatedClient = await updateClient(id, body, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: updatedClient,
	});
}

export async function getClientController(
	request: FastifyRequest<{ Params: GetClientParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	const client = await findClientByIdOrThrownError(id, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: client,
	});
}

export async function getClientsController(
	request: FastifyRequest<{ Querystring: GetClientsQuery }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { query } = request;

	const clients = await findClients(userId, query);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: clients,
	});
}

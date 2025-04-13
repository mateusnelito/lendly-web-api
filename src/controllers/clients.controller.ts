import { FastifyReply, FastifyRequest } from 'fastify';
import {
	ClientIdParams,
	CreateClientBody,
	UpdateClientBody,
} from '../schemas/clients.schema';
import { createClient, updateClient } from '../services/clients.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensureClientContactsIsAvailable,
	ensureClientExists,
} from '../validators/clients.validator';

export async function storeClientController(
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

	await ensureClientExists(id);
	await ensureClientContactsIsAvailable({ ...body, userId, excludedId: id });

	const updatedClient = await updateClient(id, body);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: updatedClient,
	});
}

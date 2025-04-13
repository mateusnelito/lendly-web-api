import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateClientBody } from '../schemas/clients.schema';
import { createClient } from '../services/clients.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import { ensureClientContactsIsAvailable } from '../validators/clients.validator';

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

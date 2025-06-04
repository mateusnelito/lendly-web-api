import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateClientBody } from '../../schemas/clients/create.schema';
import { createClient } from '../../services/clients.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { ensureClientContactsIsAvailable } from '../../validators/clients.validator';

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

import { FastifyReply, FastifyRequest } from 'fastify';
import {
	UpdateClientBody,
	UpdateClientParams,
} from '../../schemas/clients/update.schema';
import { updateClient } from '../../services/clients.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import {
	ensureClientContactsIsAvailable,
	ensureClientExists,
} from '../../validators/clients.validator';

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

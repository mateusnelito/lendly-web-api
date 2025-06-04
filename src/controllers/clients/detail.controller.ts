import { FastifyReply, FastifyRequest } from 'fastify';
import { GetClientParams } from '../../schemas/clients/detail.schema';
import { findClientByIdOrThrownError } from '../../services/clients.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

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

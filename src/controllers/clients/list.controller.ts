import { FastifyReply, FastifyRequest } from 'fastify';
import { findClients } from '../../services/clients.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

export async function getClientsController(
	request: FastifyRequest,
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

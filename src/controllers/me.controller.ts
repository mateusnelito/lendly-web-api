import { FastifyReply, FastifyRequest } from 'fastify';
import { findUserById } from '../services/users.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function getMeController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { id } = request.user;

	const user = await findUserById(id);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: user,
	});
}

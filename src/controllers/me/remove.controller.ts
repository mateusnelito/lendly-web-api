import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteUser } from '../../services/users.service';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

export async function deleteMeController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { id } = request.user;

	await deleteUser(id);

	return reply.status(HttpStatusCodes.NO_CONTENT).send();
}

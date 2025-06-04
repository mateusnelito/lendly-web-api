import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateMeBody } from '../../schemas/me/update.schema';
import { updateUser } from '../../services/users.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { ensureUserEmailIsAvailable } from '../../validators/auth.validator';

export async function updateMeController(
	request: FastifyRequest<{ Body: UpdateMeBody }>,
	reply: FastifyReply
) {
	const { id } = request.user;
	const { body } = request;

	await ensureUserEmailIsAvailable(body.email, id);

	const updatedUser = await updateUser(id, body);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: updatedUser,
	});
}

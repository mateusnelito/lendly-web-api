import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateMeBody } from '../schemas/me.schema';
import {
	deleteUser,
	findUserById,
	updateUser,
} from '../services/users.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import { ensureUserEmailIsAvailable } from '../validators/auth.validator';

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

export async function deleteMeController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { id } = request.user;

	await deleteUser(id);

	return reply.status(HttpStatusCodes.NO_CONTENT).send();
}

export async function updateMeController(
	request: FastifyRequest<{ Body: UpdateMeBody }>,
	reply: FastifyReply
) {
	const { id } = request.user;
	const { body } = request;

	await ensureUserEmailIsAvailable(body.email, id);

	const updatedUser = await updateUser(id, body);

	return reply.status(HttpStatusCodes.OK).send({
		status: 'success',
		data: updatedUser,
	});
}

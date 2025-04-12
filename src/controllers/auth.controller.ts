import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserBody } from '../schemas/users.schema';
import { createUser } from '../services/users.service';
import { ResponseStatus } from '../types/response-status.type';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import { ensureUserEmailIsAvailable } from '../validators/users.validator';

export async function registerUserController(
	request: FastifyRequest<{ Body: RegisterUserBody }>,
	reply: FastifyReply
) {
	const { body: data } = request;

	await ensureUserEmailIsAvailable(data.email);

	const newUser = await createUser(data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: newUser,
	});
}

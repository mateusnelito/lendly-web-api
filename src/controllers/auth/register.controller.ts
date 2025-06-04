import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserBody } from '../../schemas/auth/register.schema';
import { registerUser } from '../../services/auth.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { ensureUserEmailIsAvailable } from '../../validators/auth.validator';

export async function registerUserController(
	request: FastifyRequest<{ Body: RegisterUserBody }>,
	reply: FastifyReply
) {
	const { jwt } = request.server;
	const { body: data } = request;

	await ensureUserEmailIsAvailable(data.email);

	const registerUserPayload = await registerUser(data, jwt);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: registerUserPayload,
	});
}

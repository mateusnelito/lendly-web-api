import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginUserBody, RegisterUserBody } from '../schemas/auth.schema';
import { authUser } from '../services/auth.service';
import { createUser } from '../services/users.service';
import { ResponseStatus } from '../types/response-status.type';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensureUserEmailIsAvailable,
	ensureUserPasswordIsStrong,
} from '../validators/auth.validator';

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

export async function loginUserController(
	request: FastifyRequest<{ Body: LoginUserBody }>,
	reply: FastifyReply
) {
	const { jwt } = request.server;
	const { email, password } = request.body;

	await ensureUserPasswordIsStrong(password);

	const loginPayload = await authUser(email, password, jwt);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: loginPayload,
	});
}

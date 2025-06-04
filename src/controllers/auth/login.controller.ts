import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginUserBody } from '../../schemas/auth/login.schema';
import { authUser } from '../../services/auth.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { ensureUserPasswordIsStrong } from '../../validators/auth.validator';

export async function loginUserController(
	request: FastifyRequest<{ Body: LoginUserBody }>,
	reply: FastifyReply
) {
	const { jwt } = request.server;
	const { body: inputData } = request;

	await ensureUserPasswordIsStrong(inputData.password);

	const loginPayload = await authUser(inputData, jwt);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: loginPayload,
	});
}

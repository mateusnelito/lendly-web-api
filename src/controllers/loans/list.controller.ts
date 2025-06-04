import { FastifyReply, FastifyRequest } from 'fastify';
import { findLoans } from '../../services/loans.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

export async function getLoansController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { query } = request;

	const loans = await findLoans(userId, query);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: loans,
	});
}

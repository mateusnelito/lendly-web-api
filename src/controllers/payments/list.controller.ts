import { FastifyReply, FastifyRequest } from 'fastify';
import { findPayments } from '../../services/payments.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

export async function getPaymentsController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { query } = request;

	const payments = await findPayments(userId, query);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: payments,
	});
}

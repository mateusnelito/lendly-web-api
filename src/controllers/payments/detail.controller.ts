import { FastifyReply, FastifyRequest } from 'fastify';
import { GetPaymentParams } from '../../schemas/payments/detail.schema';
import { findPaymentByIdOrThrownError } from '../../services/payments.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

export async function getPaymentController(
	request: FastifyRequest<{ Params: GetPaymentParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	const payment = await findPaymentByIdOrThrownError(id, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: payment,
	});
}

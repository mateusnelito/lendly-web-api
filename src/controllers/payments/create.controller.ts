import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePaymentBody } from '../../schemas/payments/create.schema';
import { createPayment } from '../../services/payments.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { validatePaymentData } from '../../validators/payments.validator';

export async function createPaymentController(
	request: FastifyRequest<{ Body: CreatePaymentBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { body: data } = request;

	await validatePaymentData(userId, data);

	const newPayment = await createPayment(userId, data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: newPayment,
	});
}

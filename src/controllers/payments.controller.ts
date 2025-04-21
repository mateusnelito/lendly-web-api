import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePaymentBody, PaymentIdParams } from '../schemas/payments.schema';
import {
	createPayment,
	deletePayment,
	findPaymentByIdOrThrownError,
} from '../services/payments.service';
import { ResponseStatus } from '../types/response-status.type';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensurePaymentExists,
	validatePaymentData,
} from '../validators/payments.validator';

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

export async function deletePaymentController(
	request: FastifyRequest<{ Params: PaymentIdParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	await ensurePaymentExists(id, userId);

	await deletePayment(id, userId);

	return reply.status(HttpStatusCodes.NO_CONTENT).send();
}

export async function getPaymentController(
	request: FastifyRequest<{ Params: PaymentIdParams }>,
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

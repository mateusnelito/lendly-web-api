import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePaymentBody } from '../schemas/payments/create.schema';
import { GetPaymentParams } from '../schemas/payments/detail.schema';
import { GetPaymentsQuery } from '../schemas/payments/list.schema';
import { DeletePaymentParams } from '../schemas/payments/remove.schema';
import {
	createPayment,
	deletePayment,
	findPaymentByIdOrThrownError,
	findPayments,
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
	request: FastifyRequest<{ Params: DeletePaymentParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	await ensurePaymentExists(id, userId);

	await deletePayment(id, userId);

	return reply.status(HttpStatusCodes.NO_CONTENT).send();
}

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

export async function getPaymentsController(
	request: FastifyRequest<{ Querystring: GetPaymentsQuery }>,
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

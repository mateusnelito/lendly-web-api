import { FastifyReply, FastifyRequest } from 'fastify';
import { DeletePaymentParams } from '../../schemas/payments/remove.schema';
import { deletePayment } from '../../services/payments.service';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import { ensurePaymentExists } from '../../validators/payments.validator';

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

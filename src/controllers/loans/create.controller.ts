import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLoanBody } from '../../schemas/loans/create.schema';
import { createLoan } from '../../services/loans.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import {
	ensureClientIdExists,
	validateLoanData,
} from '../../validators/loans.validator';

export async function createLoanController(
	request: FastifyRequest<{ Body: CreateLoanBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { body: data } = request;

	await ensureClientIdExists(data.clientId, userId);
	await validateLoanData(data);

	const newLoan = await createLoan(userId, data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: newLoan,
	});
}

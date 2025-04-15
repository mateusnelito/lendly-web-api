import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLoanBody } from '../schemas/loans.schema';
import { createClient } from '../services/clients.service';
import { createLoan } from '../services/loans.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import { ensureClientContactsIsAvailable } from '../validators/clients.validator';
import {
	ensureClientIdExists,
	validateLoanData,
} from '../validators/loans.validator';

export async function storeLoanController(
	request: FastifyRequest<{ Body: CreateLoanBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { body: data } = request;

	await ensureClientIdExists(data.clientId, userId);
	await validateLoanData(data);

	const newLoan = await createLoan(userId, data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: 'success',
		data: newLoan,
	});
}

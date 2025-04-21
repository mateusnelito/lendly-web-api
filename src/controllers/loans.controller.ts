import { FastifyReply, FastifyRequest } from 'fastify';
import {
	CreateLoanBody,
	LoanIdParams,
	UpdateLoanBody,
} from '../schemas/loans.schema';
import { createLoan, updateLoan } from '../services/loans.service';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensureClientIdExists,
	ensureLoanExists,
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

export async function updateLoanController(
	request: FastifyRequest<{ Params: LoanIdParams; Body: UpdateLoanBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;
	const { body: data } = request;

	await ensureLoanExists(id, userId);
	await validateLoanData(data);

	const updatedLoan = await updateLoan(userId, id, data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: 'success',
		data: updatedLoan,
	});
}

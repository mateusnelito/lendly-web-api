import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateLoanBody } from '../schemas/loans/create.schema';
import { GetLoanParams } from '../schemas/loans/detail.schema';
import { GetLoansQuery } from '../schemas/loans/list.schema';
import {
	UpdateLoanBody,
	UpdateLoanParams,
} from '../schemas/loans/update.schema';
import {
	createLoan,
	findLoanByIdOrThrownError,
	findLoans,
	updateLoan,
} from '../services/loans.service';
import { ResponseStatus } from '../types/response-status.type';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import {
	ensureClientIdExists,
	ensureLoanExists,
	validateLoanData,
} from '../validators/loans.validator';

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

export async function updateLoanController(
	request: FastifyRequest<{ Params: UpdateLoanParams; Body: UpdateLoanBody }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;
	const { body: data } = request;

	await ensureLoanExists(id, userId);
	await validateLoanData(data);

	const updatedLoan = await updateLoan(userId, id, data);

	return reply.status(HttpStatusCodes.CREATED).send({
		status: ResponseStatus.SUCCESS,
		data: updatedLoan,
	});
}

export async function getLoansController(
	request: FastifyRequest<{ Querystring: GetLoansQuery }>,
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

export async function getLoanController(
	request: FastifyRequest<{ Params: GetLoanParams }>,
	reply: FastifyReply
) {
	const { id: userId } = request.user;
	const { id } = request.params;

	const loan = await findLoanByIdOrThrownError(id, userId);

	return reply.status(HttpStatusCodes.OK).send({
		status: ResponseStatus.SUCCESS,
		data: loan,
	});
}

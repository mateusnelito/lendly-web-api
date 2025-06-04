import { FastifyReply, FastifyRequest } from 'fastify';
import {
	UpdateLoanBody,
	UpdateLoanParams,
} from '../../schemas/loans/update.schema';
import { updateLoan } from '../../services/loans.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';
import {
	ensureLoanExists,
	validateLoanData,
} from '../../validators/loans.validator';

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

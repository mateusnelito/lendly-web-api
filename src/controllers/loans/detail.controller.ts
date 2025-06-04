import { FastifyReply, FastifyRequest } from 'fastify';
import { GetLoanParams } from '../../schemas/loans/detail.schema';
import { findLoanByIdOrThrownError } from '../../services/loans.service';
import { ResponseStatus } from '../../types/response-status.type';
import { HttpStatusCodes } from '../../utils/http-status-codes.util';

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

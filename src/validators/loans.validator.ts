import { CreateLoanBody, UpdateLoanBody } from '../schemas/loans.schema';
import { findClientById } from '../services/clients.service';
import ClientError from '../utils/client-error.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

const MINIMUM_BASE_DUE_DATE_YEARS = 2;

export async function ensureClientIdExists(clientId: number, userId: string) {
	const client = await findClientById(clientId, userId);

	if (!client)
		throw new ClientError('Cliente inválido.', HttpStatusCodes.NOT_FOUND, {
			clientId: ['Cliente não encontrado.'],
		});

	return client;
}

export async function validateLoanData(data: CreateLoanBody | UpdateLoanBody) {
	const {
		baseDueDate: baseDueDateString,
		hasInterest,
		interestValuePerMonth,
	} = data;

	const baseDueDate = new Date(baseDueDateString);
	const todayDate = new Date();

	const fiveYearsFromNow = new Date(todayDate);
	fiveYearsFromNow.setFullYear(
		fiveYearsFromNow.getFullYear() + MINIMUM_BASE_DUE_DATE_YEARS
	);

	if (baseDueDate <= todayDate)
		throw new ClientError(
			'Data de pagamento inválida.',
			HttpStatusCodes.BAD_REQUEST,
			{ baseDueDate: ['A data de pagamento deve ser futura.'] }
		);

	if (baseDueDate > fiveYearsFromNow)
		throw new ClientError(
			'Data de pagamento inválida.',
			HttpStatusCodes.BAD_REQUEST,
			{
				baseDueDate: [
					`A data de pagamento não pode ser superior a ${MINIMUM_BASE_DUE_DATE_YEARS} anos.`,
				],
			}
		);

	if (hasInterest && !interestValuePerMonth)
		throw new ClientError(
			'Valor de juros não informado.',
			HttpStatusCodes.BAD_REQUEST,
			{
				interestValuePerMonth: [
					'Para empréstimos com juros, é obrigatório informar o valor dos juros mensais.',
				],
			}
		);
}

export async function ensureLoanExists(id: number, userId: string) {
	const loan = await findClientById(id, userId);

	if (!loan)
		throw new ClientError(
			'Empréstimo não registrado.',
			HttpStatusCodes.NOT_FOUND
		);

	return loan;
}

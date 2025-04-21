import { CreatePaymentBody } from '../schemas/payments.schema';
import { findLoanById } from '../services/loans.service';
import ClientError from '../utils/client-error.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

const MAX_YEARS_IN_PAST_FOR_PAYMENT_DATE = 1;

export async function ensureLoanIdExists(loanId: number, userId: string) {
	const loan = await findLoanById(loanId, userId);

	if (!loan)
		throw new ClientError('Empréstimo inválido.', HttpStatusCodes.NOT_FOUND, {
			loanId: ['Empréstimo não encontrado.'],
		});

	return loan;
}

export async function validatePaymentData(
	userId: string,
	data: CreatePaymentBody
) {
	const { loanId, amount, date } = data;

	const loan = await ensureLoanIdExists(loanId, userId);

	if (amount < loan.amountGiven) {
		throw new ClientError(
			'Valor de pagamento inválido.',
			HttpStatusCodes.BAD_REQUEST,
			{
				amount: [
					'O valor do pagamento não pode ser inferior ao valor emprestado.',
				],
			}
		);
	}

	if (loan.isPaid) {
		throw new ClientError('Pagamento inválido.', HttpStatusCodes.BAD_REQUEST, {
			loanId: ['Este empréstimo já está quitado.'],
		});
	}

	if (date) {
		const today = new Date();
		const paymentDate = new Date(date);

		if (paymentDate > today) {
			throw new ClientError(
				'Data de pagamento inválida.',
				HttpStatusCodes.BAD_REQUEST,
				{ date: ['A data do pagamento não pode estar no futuro.'] }
			);
		}

		const limitPaymentDate = new Date();
		limitPaymentDate.setFullYear(
			limitPaymentDate.getFullYear() - MAX_YEARS_IN_PAST_FOR_PAYMENT_DATE
		);

		if (paymentDate < limitPaymentDate) {
			throw new ClientError(
				'Data de pagamento inválida.',
				HttpStatusCodes.BAD_REQUEST,
				{
					date: [
						`A data do pagamento não pode ser anterior a ${MAX_YEARS_IN_PAST_FOR_PAYMENT_DATE} anos.`,
					],
				}
			);
		}
	}

	return loan;
}

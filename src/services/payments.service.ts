import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../db';
import { clients } from '../db/schema/clients';
import { loans } from '../db/schema/loans';
import { payments } from '../db/schema/payments';
import { CreatePaymentBody } from '../schemas/payments.schema';
import ClientError from '../utils/client-error.util';
import {
	SELECT_CLIENT_FIELDS,
	SELECT_LOAN_FIELDS,
	SELECT_PAYMENT_FIELDS,
} from '../utils/drizzle.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function createPayment(userId: string, data: CreatePaymentBody) {
	const { loanId, amount, date } = data;

	const newPayment = await db.transaction(async tx => {
		const [payment] = await tx
			.insert(payments)
			.values({
				userId,
				amount,
				loanId,
				date: date ? new Date(date) : undefined,
			})
			.returning(SELECT_PAYMENT_FIELDS);

		const [updatedLoan] = await tx
			.update(loans)
			.set({ isPaid: true })
			.where(eq(loans.id, loanId))
			.returning(SELECT_LOAN_FIELDS);

		return { ...payment, loan: updatedLoan };
	});

	return newPayment;
}

export async function findPaymentById(id: number, userId: string) {
	const [payment] = await db
		.select(SELECT_PAYMENT_FIELDS)
		.from(payments)
		.where(
			and(
				eq(payments.id, id),
				eq(payments.userId, userId),
				isNull(payments.deletedAt)
			)
		)
		.limit(1);

	return payment;
}

export async function deletePayment(id: number, userId: string) {
	const deletedPayment = await db.transaction(async tx => {
		const [payment] = await tx
			.update(payments)
			.set({ deletedAt: new Date() })
			.where(
				and(
					eq(payments.id, id),
					eq(payments.userId, userId),
					isNull(payments.deletedAt)
				)
			)
			.returning(SELECT_PAYMENT_FIELDS);

		const [updatedLoan] = await tx
			.update(loans)
			.set({ isPaid: false })
			.where(and(eq(loans.id, payment.loanId), eq(loans.userId, userId)))
			.returning(SELECT_LOAN_FIELDS);

		return { ...payment, loan: updatedLoan };
	});

	return deletedPayment;
}

export async function findPaymentByIdOrThrownError(id: number, userId: string) {
	const [paymentWithLoan] = await db
		.select({
			...SELECT_PAYMENT_FIELDS,
			loan: SELECT_LOAN_FIELDS,
			client: SELECT_CLIENT_FIELDS,
		})
		.from(payments)
		.innerJoin(loans, eq(payments.loanId, loans.id))
		.innerJoin(clients, eq(loans.clientId, clients.id))
		.where(
			and(
				eq(payments.id, id),
				eq(payments.userId, userId),
				isNull(payments.deletedAt)
			)
		)
		.limit(1);

	if (!paymentWithLoan) {
		throw new ClientError(
			'Pagamento não registrado ou excluído.',
			HttpStatusCodes.NOT_FOUND
		);
	}

	const { loan, client, ...payment } = paymentWithLoan;

	return {
		...payment,
		loan: {
			...loan,
			client,
		},
	};
}

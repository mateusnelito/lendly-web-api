import { eq } from 'drizzle-orm';
import { db } from '../db';
import { loans } from '../db/schema/loans';
import { payments } from '../db/schema/payments';
import { CreatePaymentBody } from '../schemas/payments.schema';
import {
	SELECT_LOAN_FIELDS,
	SELECT_PAYMENT_FIELDS,
} from '../utils/drizzle.util';

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

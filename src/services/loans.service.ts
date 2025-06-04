import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { loans } from '../db/schema/loans';
import { payments } from '../db/schema/payments';
import { CreateLoanBody } from '../schemas/loans/create.schema';
import { UpdateLoanBody } from '../schemas/loans/update.schema';
import ClientError from '../utils/client-error.util';
import { SELECT_LOAN_FIELDS } from '../utils/drizzle.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function createLoan(userId: string, data: CreateLoanBody) {
	const interest = data.hasInterest ? data.interestValuePerMonth : null;

	const [loan] = await db
		.insert(loans)
		.values({
			...data,
			userId,
			interestValuePerMonth: interest,
		})
		.returning(SELECT_LOAN_FIELDS);

	return loan;
}

export async function findLoanById(id: number, userId: string) {
	const [loan] = await db
		.select(SELECT_LOAN_FIELDS)
		.from(loans)
		.where(and(eq(loans.id, id), eq(loans.userId, userId)))
		.limit(1);

	return loan;
}

export async function updateLoan(
	userId: string,
	id: number,
	data: UpdateLoanBody
) {
	const interest = data.hasInterest ? data.interestValuePerMonth : null;

	const [loan] = await db
		.update(loans)
		.set({
			...data,
			userId,
			interestValuePerMonth: interest,
		})
		.where(and(eq(loans.userId, userId), eq(loans.id, id)))
		.returning(SELECT_LOAN_FIELDS);

	return loan;
}

export async function findLoans(userId: string) {
	const userLoans = await db
		.select(SELECT_LOAN_FIELDS)
		.from(loans)
		.where(eq(loans.userId, userId))
		.orderBy(desc(loans.id));

	return { loans: userLoans };
}

export async function findLoanByIdOrThrownError(id: number, userId: string) {
	const [loan] = await db
		.select({
			...SELECT_LOAN_FIELDS,
			payment: {
				id: payments.id,
				amount: payments.amount,
				date: payments.date,
				deletedAt: payments.deletedAt,
			},
		})
		.from(loans)
		.leftJoin(payments, eq(loans.id, payments.loanId))
		.where(and(eq(loans.id, id), eq(loans.userId, userId)))
		.limit(1);

	if (!loan) {
		throw new ClientError(
			'Empréstimo não registrado',
			HttpStatusCodes.NOT_FOUND
		);
	}

	return loan;
}

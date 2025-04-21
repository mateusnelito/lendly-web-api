import { and, desc, eq, lt } from 'drizzle-orm';
import { db } from '../db';
import { loans } from '../db/schema/loans';
import {
	CreateLoanBody,
	GetLoansQueryString,
	UpdateLoanBody,
} from '../schemas/loans.schema';
import { byUserIdEquals } from '../utils/drizzle.util';
import { getNextCursor } from '../utils/pagination.util';

const SELECT_LOAN_FIELDS = {
	id: loans.id,
	clientId: loans.clientId,
	amountGiven: loans.amountGiven,
	baseDueDate: loans.baseDueDate,
	isPaid: loans.isPaid,
	hasInterest: loans.hasInterest,
	interestValuePerMonth: loans.interestValuePerMonth,
	notes: loans.notes,
	createdAt: loans.createdAt,
	updatedAt: loans.updatedAt,
};

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
		.where(and(eq(loans.id, id), byUserIdEquals(userId)))
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

export async function findLoans(userId: string, params: GetLoansQueryString) {
	const { clientId, isPaid, hasInterest, size, cursor } = params;

	const filtersClause = [
		eq(loans.userId, userId),
		clientId ? eq(loans.clientId, clientId) : undefined,
		isPaid !== undefined ? eq(loans.isPaid, isPaid) : undefined,
		hasInterest !== undefined ? eq(loans.hasInterest, hasInterest) : undefined,
		cursor ? lt(loans.id, cursor) : undefined,
	].filter(Boolean);

	const userLoans = await db
		.select(SELECT_LOAN_FIELDS)
		.from(loans)
		.where(and(...filtersClause))
		.limit(size)
		.orderBy(desc(loans.id));

	const nextCursor = getNextCursor(userLoans, size);

	return { loans: userLoans, nextCursor };
}

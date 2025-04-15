import { db } from '../db';
import { loans } from '../db/schema/loans';
import { CreateLoanBody } from '../schemas/loans.schema';

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

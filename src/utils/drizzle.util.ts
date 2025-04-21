import { eq } from 'drizzle-orm';
import { clients } from '../db/schema/clients';
import { loans } from '../db/schema/loans';
import { payments } from '../db/schema/payments';
import { users } from '../db/schema/users';

// TODO: MAKE more generic to be used by any drizzle table
export function byUserIdEquals(userId: string) {
	return eq(clients.userId, userId);
}

export const SELECT_LOAN_FIELDS = {
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

export const SELECT_CLIENT_FIELDS = {
	id: clients.id,
	name: clients.name,
	email: clients.email,
	phone: clients.phone,
	createdAt: clients.createdAt,
	updatedAt: clients.updatedAt,
};

export const SELECT_PAYMENT_FIELDS = {
	id: payments.id,
	loanId: payments.loanId,
	amount: payments.amount,
	date: payments.date,
	deletedAt: payments.deletedAt,
};

export const SELECT_USER_FIELDS = {
	id: users.id,
	name: users.name,
	email: users.email,
	isDeleted: users.isDeleted,
	createdAt: users.createdAt,
	updatedAt: users.updatedAt,
};

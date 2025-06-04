import { z } from 'zod';
import { validationErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';

const createLoanBodySchema = z.object({
	clientId: loanSchema.shape.clientId,
	amountGiven: loanSchema.shape.amountGiven,
	baseDueDate: loanSchema.shape.baseDueDate,
	isPaid: loanSchema.shape.isPaid,
	hasInterest: loanSchema.shape.hasInterest,
	interestValuePerMonth: loanSchema.shape.interestValuePerMonth.optional(),
	notes: loanSchema.shape.notes.optional(),
});

export const createLoanRouteSchema = {
	summary: 'Register a new user loan',
	description: 'Add new loans to user account',
	tags: ['loans'],
	body: createLoanBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: loanSchema,
		}),
		400: validationErrorResponseSchema,
		404: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreateLoanBody = z.infer<typeof createLoanBodySchema>;

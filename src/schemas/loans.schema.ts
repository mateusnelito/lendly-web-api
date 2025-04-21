import { z } from 'zod';
import { clientSchema } from './clients.schema';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import {
	createdAtSchema,
	descriptionSchema,
	intIdParamsSchema,
	intPositiveNumberSchema,
	updatedAtSchema,
} from './primitive.schema';
import { userSchema } from './users.schema';

export const loanSchema = z.object({
	id: intPositiveNumberSchema,
	clientId: clientSchema.shape.id,
	userId: userSchema.shape.id,
	amountGiven: intPositiveNumberSchema,
	baseDueDate: z.string().date(),
	isPaid: z.boolean().default(false),
	hasInterest: z.boolean().default(false),
	interestValuePerMonth: intPositiveNumberSchema.nullable(),
	notes: descriptionSchema.nullable(),
	createdAt: createdAtSchema,
	updatedAt: updatedAtSchema,
});

const createLoanBodySchema = z.object({
	clientId: loanSchema.shape.clientId,
	amountGiven: loanSchema.shape.amountGiven,
	baseDueDate: loanSchema.shape.baseDueDate,
	isPaid: loanSchema.shape.isPaid,
	hasInterest: loanSchema.shape.hasInterest,
	interestValuePerMonth: loanSchema.shape.interestValuePerMonth.optional(),
	notes: loanSchema.shape.notes.optional(),
});

const loanIdParamsSchema = z.object({
	id: intIdParamsSchema,
});

const updateLoanBodySchema = z.object({
	baseDueDate: loanSchema.shape.baseDueDate,
	hasInterest: loanSchema.shape.hasInterest,
	interestValuePerMonth: loanSchema.shape.interestValuePerMonth.optional(),
	notes: loanSchema.shape.notes.optional(),
});

export const storeLoanSchema = {
	summary: 'Register a new user loan.',
	tags: ['loans'],
	body: createLoanBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: loanSchema.omit({ userId: true }),
		}),
		400: validationErrorResponseSchema,
		404: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export const updateLoanSchema = {
	summary: 'Update a user loan.',
	tags: ['loans'],
	params: loanIdParamsSchema,
	body: updateLoanBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: loanSchema.omit({ userId: true }),
		}),
		400: validationErrorResponseSchema,
		404: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreateLoanBody = z.infer<typeof createLoanBodySchema>;
export type UpdateLoanBody = z.infer<typeof updateLoanBodySchema>;
export type LoanIdParams = z.infer<typeof loanIdParamsSchema>;

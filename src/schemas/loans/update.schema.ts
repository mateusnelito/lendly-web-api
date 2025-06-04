import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from '../error.schema';
import { loanSchema } from '../loans.schema';
import { coercedNumberIntSchema } from '../primitive.schema';

const updateLoanRouteParamsSchema = z.object({
	id: coercedNumberIntSchema,
});

const updateLoanBodySchema = z.object({
	baseDueDate: loanSchema.shape.baseDueDate,
	hasInterest: loanSchema.shape.hasInterest,
	interestValuePerMonth: loanSchema.shape.interestValuePerMonth.optional(),
	notes: loanSchema.shape.notes.optional(),
});

export const updateLoanRouteSchema = {
	summary: 'Update a user loan',
	description: 'Update a user loan data',
	tags: ['loans'],
	params: updateLoanRouteParamsSchema,
	body: updateLoanBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: loanSchema,
		}),
		400: validationErrorResponseSchema,
		404: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type UpdateLoanBody = z.infer<typeof updateLoanBodySchema>;
export type UpdateLoanParams = z.infer<typeof updateLoanRouteParamsSchema>;

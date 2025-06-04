import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import { numberIntPositiveSchema } from '../primitive.schema';

export const getLoansRouteSchema = {
	summary: 'Get a user loans',
	description: 'Get all user loans',
	tags: ['loans'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				loans: z.array(loanSchema),
				nextCursor: numberIntPositiveSchema.optional(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

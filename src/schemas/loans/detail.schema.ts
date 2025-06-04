import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import {
	coercedNumberIntSchema,
	nullableTimestampSchema,
	numberIntPositiveSchema,
} from '../primitive.schema';

const getLoanParamsSchema = z.object({
	id: coercedNumberIntSchema,
});

export const getLoanRouteSchema = {
	summary: 'Get a user loan',
	description: 'Get a user loan full detail',
	tags: ['loans'],
	params: getLoanParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: loanSchema.extend({
				// TODO: Replace with correct payment schema
				payment: z
					.object({
						id: numberIntPositiveSchema,
						amount: numberIntPositiveSchema,
						date: nullableTimestampSchema,
						deletedAt: nullableTimestampSchema,
					})
					.nullable(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type GetLoanParams = z.infer<typeof getLoanParamsSchema>;

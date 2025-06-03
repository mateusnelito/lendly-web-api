import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import {
	intIdParamsSchema,
	intPositiveNumberSchema,
	updatedAtSchema,
} from '../primitive.schema';

const getLoanParamsSchema = z.object({
	id: intIdParamsSchema,
});

export const getLoanRouteSchema = {
	summary: 'Get a user loan',
	description: 'Get a user loan full detail',
	tags: ['loans'],
	params: getLoanParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: loanSchema.omit({ userId: true }).extend({
				// TODO: Replace with correct payment schema
				payment: z
					.object({
						id: intPositiveNumberSchema,
						amount: intPositiveNumberSchema,
						date: updatedAtSchema,
						deletedAt: updatedAtSchema,
					})
					.nullable(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type GetLoanParams = z.infer<typeof getLoanParamsSchema>;

import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import {
	booleanQueryStringSchema,
	intIdParamsSchema,
	intPositiveNumberSchema,
	sizeQueryStringSchema,
} from '../primitive.schema';

const getLoansQuerySchema = z.object({
	clientId: intIdParamsSchema.optional(),
	isPaid: booleanQueryStringSchema.optional(),
	hasInterest: booleanQueryStringSchema.optional(),
	size: sizeQueryStringSchema,
	cursor: intIdParamsSchema.optional(),
});

export const getLoansRouteSchema = {
	summary: 'Get a user loans',
	description: 'Get all user loans',
	tags: ['loans'],
	querystring: getLoansQuerySchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				loans: z.array(loanSchema.omit({ userId: true })),
				nextCursor: intPositiveNumberSchema.optional(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type GetLoansQuery = z.infer<typeof getLoansQuerySchema>;

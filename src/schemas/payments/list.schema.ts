import { z } from 'zod';
import { paymentSchema } from '../payments.schema';
import {
	booleanQueryStringSchema,
	intIdParamsSchema,
	intPositiveNumberSchema,
	sizeQueryStringSchema,
	stringDateSchema,
} from '../primitive.schema';

const getPaymentsQuerySchema = z.object({
	startDate: stringDateSchema.optional(),
	endDate: stringDateSchema.optional(),
	includeDeleted: booleanQueryStringSchema.optional(),
	size: sizeQueryStringSchema,
	cursor: intIdParamsSchema.optional(),
});

export const getPaymentsRouteSchema = {
	summary: 'Get a user payments',
	description: 'Get all user payments',
	tags: ['payments'],
	querystring: getPaymentsQuerySchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				payments: z.array(paymentSchema.omit({ userId: true })),
				nextCursor: intPositiveNumberSchema.optional(),
			}),
		}),
	},
};

export type GetPaymentsQuery = z.infer<typeof getPaymentsQuerySchema>;

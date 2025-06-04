import { z } from 'zod';
import { paymentSchema } from '../payments.schema';
import { numberIntPositiveSchema } from '../primitive.schema';

export const getPaymentsRouteSchema = {
	summary: 'Get a user payments',
	description: 'Get all user payments',
	tags: ['payments'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				payments: z.array(paymentSchema),
				nextCursor: numberIntPositiveSchema.optional(),
			}),
		}),
	},
};

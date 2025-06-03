import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { intIdParamsSchema } from '../primitive.schema';

const deletePaymentParamsSchema = z.object({
	id: intIdParamsSchema,
});

export const deletePaymentRouteSchema = {
	summary: 'Delete a user payment',
	description: 'Remove a user payment',
	tags: ['payments'],
	params: deletePaymentParamsSchema,
	response: {
		404: businessErrorResponseSchema,
	},
};

export type DeletePaymentParams = z.infer<typeof deletePaymentParamsSchema>;

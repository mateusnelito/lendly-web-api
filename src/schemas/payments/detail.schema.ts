import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import { paymentSchema } from '../payments.schema';
import { intIdParamsSchema } from '../primitive.schema';

const getPaymentParamsSchema = z.object({
	id: intIdParamsSchema,
});

export const getPaymentRouteSchema = {
	summary: 'Get a user payment',
	description: 'Get a user payment full detail',
	tags: ['payments'],
	params: getPaymentParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: paymentSchema.omit({ userId: true, loanId: true }).extend({
				loan: loanSchema.omit({ userId: true, clientId: true }).extend({
					client: clientSchema.omit({ userId: true }),
				}),
			}),
		}),
		404: businessErrorResponseSchema,
	},
};

export type GetPaymentParams = z.infer<typeof getPaymentParamsSchema>;

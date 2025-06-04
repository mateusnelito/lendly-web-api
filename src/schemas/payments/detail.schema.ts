import { z } from 'zod';
import { clientSchema } from '../clients/base.schema';
import { businessErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans/base.schema';
import { coercedNumberIntSchema } from '../primitive.schema';
import { paymentSchema } from './base.schema';

const getPaymentParamsSchema = z.object({
	id: coercedNumberIntSchema,
});

export const getPaymentRouteSchema = {
	summary: 'Get a user payment',
	description: 'Get a user payment full detail',
	tags: ['payments'],
	params: getPaymentParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: paymentSchema.omit({ loanId: true }).extend({
				loan: loanSchema.omit({ clientId: true }).extend({
					client: clientSchema,
				}),
			}),
		}),
		404: businessErrorResponseSchema,
	},
};

export type GetPaymentParams = z.infer<typeof getPaymentParamsSchema>;

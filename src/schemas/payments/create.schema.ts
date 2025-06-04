import { z } from 'zod';
import { validationErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans/base.schema';
import { paymentSchema } from './base.schema';

const createPaymentBodySchema = z.object({
	loanId: paymentSchema.shape.loanId,
	amount: paymentSchema.shape.amount,
	date: z.string().date().optional(),
});

export const createPaymentRouteSchema = {
	summary: 'Register a new user payment',
	description: 'Add new payment record to the user account',
	tags: ['payments'],
	body: createPaymentBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: paymentSchema.extend({
				loan: loanSchema,
			}),
		}),
		400: validationErrorResponseSchema,
		404: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreatePaymentBody = z.infer<typeof createPaymentBodySchema>;

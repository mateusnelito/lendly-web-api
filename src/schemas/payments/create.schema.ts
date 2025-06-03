import { z } from 'zod';
import { validationErrorResponseSchema } from '../error.schema';
import { loanSchema } from '../loans.schema';
import { paymentSchema } from '../payments.schema';
import { stringDateSchema } from '../primitive.schema';

const createPaymentBodySchema = z.object({
	loanId: paymentSchema.shape.loanId,
	amount: paymentSchema.shape.amount,
	date: stringDateSchema.optional(),
});

export const createPaymentRouteSchema = {
	summary: 'Register a new user payment',
	description: 'Add new payment record to the user account',
	tags: ['payments'],
	body: createPaymentBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: paymentSchema.omit({ userId: true }).extend({
				loan: loanSchema.omit({ userId: true }),
			}),
		}),
		400: validationErrorResponseSchema,
		404: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreatePaymentBody = z.infer<typeof createPaymentBodySchema>;

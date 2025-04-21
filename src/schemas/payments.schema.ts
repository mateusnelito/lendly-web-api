import { z } from 'zod';
import { validationErrorResponseSchema } from './error.schema';
import { loanSchema } from './loans.schema';
import {
	intPositiveNumberSchema,
	stringDateSchema,
	updatedAtSchema,
} from './primitive.schema';
import { userSchema } from './users.schema';

export const paymentSchema = z.object({
	id: intPositiveNumberSchema,
	userId: userSchema.shape.id,
	loanId: loanSchema.shape.id,
	amount: intPositiveNumberSchema,
	date: z.date(),
	deletedAt: updatedAtSchema,
});

const createPaymentBodySchema = z.object({
	loanId: paymentSchema.shape.loanId,
	amount: paymentSchema.shape.amount,
	date: stringDateSchema.optional(),
});

export const createPaymentSchema = {
	summary: 'Register a new user payment.',
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

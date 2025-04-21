import { z } from 'zod';
import { clientSchema } from './clients.schema';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import { loanSchema } from './loans.schema';
import {
	booleanQueryStringSchema,
	intIdParamsSchema,
	intPositiveNumberSchema,
	sizeQueryStringSchema,
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

const paymentIdParamsSchema = z.object({
	id: intIdParamsSchema,
});

export const deletePaymentSchema = {
	summary: 'Delete a user payment.',
	tags: ['payments'],
	params: paymentIdParamsSchema,
	response: {
		404: businessErrorResponseSchema,
	},
};

export const getPaymentSchema = {
	summary: 'Get a user payment.',
	tags: ['payments'],
	params: paymentIdParamsSchema,
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

const getPaymentsQueryStringSchema = z.object({
	startDate: stringDateSchema.optional(),
	endDate: stringDateSchema.optional(),
	includeDeleted: booleanQueryStringSchema.optional(),
	size: sizeQueryStringSchema,
	cursor: intIdParamsSchema.optional(),
});

export const getPaymentsSchema = {
	summary: 'Get a user payments.',
	tags: ['payments'],
	querystring: getPaymentsQueryStringSchema,
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

export type CreatePaymentBody = z.infer<typeof createPaymentBodySchema>;
export type PaymentIdParams = z.infer<typeof paymentIdParamsSchema>;
export type GetPaymentsQueryString = z.infer<
	typeof getPaymentsQueryStringSchema
>;

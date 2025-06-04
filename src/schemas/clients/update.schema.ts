import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from '../error.schema';
import { coercedNumberIntSchema } from '../primitive.schema';
import { clientSchema } from './base.schema';

const updateClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

const updateClientRouteParamsSchema = z.object({
	id: coercedNumberIntSchema,
});

export const updateClientRouteSchema = {
	summary: 'Update a user client',
	description: 'Update a user client data',
	tags: ['clients'],
	body: updateClientBodySchema,
	params: updateClientRouteParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: clientSchema,
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type UpdateClientBody = z.infer<typeof updateClientBodySchema>;
export type UpdateClientParams = z.infer<typeof updateClientRouteParamsSchema>;

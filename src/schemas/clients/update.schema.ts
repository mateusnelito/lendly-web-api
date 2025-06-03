import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from '../error.schema';
import { intIdParamsSchema } from '../primitive.schema';

const updateClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

const updateClientRouteParamsSchema = z.object({
	id: intIdParamsSchema,
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
			data: clientSchema.omit({ userId: true }),
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type UpdateClientBody = z.infer<typeof updateClientBodySchema>;
export type UpdateClientParams = z.infer<typeof updateClientRouteParamsSchema>;

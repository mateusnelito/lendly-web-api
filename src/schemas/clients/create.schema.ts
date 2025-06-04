import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from '../error.schema';

const createClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

export const createClientRouteSchema = {
	summary: 'Register a new user client',
	description: 'Add a new client to the user account',
	tags: ['clients'],
	body: createClientBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: clientSchema,
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreateClientBody = z.infer<typeof createClientBodySchema>;

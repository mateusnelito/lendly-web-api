import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import { businessErrorResponseSchema } from '../error.schema';
import { numberIntPositiveSchema } from '../primitive.schema';

export const getClientsRouteSchema = {
	summary: 'Get a user clients',
	description: 'Get all user clients',
	tags: ['clients'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				clients: z.array(clientSchema),
				nextCursor: numberIntPositiveSchema.optional(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

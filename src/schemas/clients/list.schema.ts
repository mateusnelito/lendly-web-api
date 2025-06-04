import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { numberIntPositiveSchema } from '../primitive.schema';
import { clientSchema } from './base.schema';

export const getClientsRouteSchema = {
	summary: 'Get a user clients',
	description: 'Get all user clients',
	tags: ['clients'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				clients: z.array(clientSchema),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

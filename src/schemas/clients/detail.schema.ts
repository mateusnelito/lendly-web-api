import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import { businessErrorResponseSchema } from '../error.schema';
import { coercedNumberIntSchema } from '../primitive.schema';

const getClientRouteParamsSchema = z.object({
	id: coercedNumberIntSchema,
});

export const getClientRouteSchema = {
	summary: 'Get a user client',
	description: 'Get user client full details',
	tags: ['clients'],
	params: getClientRouteParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: clientSchema,
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type GetClientParams = z.infer<typeof getClientRouteParamsSchema>;

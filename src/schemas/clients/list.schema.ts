import { z } from 'zod';
import { clientSchema } from '../clients.schema';
import { businessErrorResponseSchema } from '../error.schema';
import {
	intIdParamsSchema,
	intPositiveNumberSchema,
	sizeQueryStringSchema,
} from '../primitive.schema';

const getClientsRouteQueryStringSchema = z.object({
	q: z.string().optional(),
	size: sizeQueryStringSchema,
	cursor: intIdParamsSchema.optional(),
});

export const getClientsRouteSchema = {
	summary: 'Get a user clients',
	description: 'Get all user clients',
	tags: ['clients'],
	querystring: getClientsRouteQueryStringSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				clients: z.array(clientSchema.omit({ userId: true })),
				nextCursor: intPositiveNumberSchema.optional(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type GetClientsQuery = z.infer<typeof getClientsRouteQueryStringSchema>;

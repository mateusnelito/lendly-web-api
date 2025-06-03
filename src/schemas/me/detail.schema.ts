import { z } from 'zod';
import { businessErrorResponseSchema } from '../error.schema';
import { userSchema } from '../users.schema';

export const getMeRouteSchema = {
	summary: 'Allow the current user get account details',
	description: 'Get a user account details',
	tags: ['me'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: userSchema,
		}),
		401: businessErrorResponseSchema,
	},
};

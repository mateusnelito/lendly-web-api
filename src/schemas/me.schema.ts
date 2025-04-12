import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import { userSchema } from './users.schema';

// TODO: DEFINE THAT THE ROUTE REQUIRE LOGIN AUTHENTICATE
export const getMeSchema = {
	summary: 'Allow the current user get account details.',
	tags: ['me'],
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: userSchema,
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
	},
};

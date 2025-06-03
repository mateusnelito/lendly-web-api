import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from '../error.schema';
import { userSchema } from '../users.schema';

const loginUserBodySchema = userSchema.pick({ email: true }).extend({
	password: z.string().trim().min(8).max(255),
});

export const loginUserRouteSchema = {
	summary: 'Login a user',
	description: 'Authenticate user credentials',
	tags: ['auth'],
	body: loginUserBodySchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				accessToken: z.string().jwt(),
				user: userSchema.pick({ id: true, email: true }),
			}),
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
	},
};

export type LoginUserBody = z.infer<typeof loginUserBodySchema>;

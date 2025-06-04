import { z } from 'zod';
import { validationErrorResponseSchema } from '../error.schema';
import { userPasswordSchema, userSchema } from '../users.schema';

const registerUserBodySchema = z.object({
	name: userSchema.shape.name,
	email: userSchema.shape.email,
	password: userPasswordSchema,
});

export const registerUserRouteSchema = {
	summary: 'Register a new user',
	description: 'Add a new user account to the system',
	tags: ['auth'],
	body: registerUserBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: z.object({ user: userSchema, accessToken: z.string().jwt() }),
		}),
		400: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type RegisterUserBody = z.infer<typeof registerUserBodySchema>;

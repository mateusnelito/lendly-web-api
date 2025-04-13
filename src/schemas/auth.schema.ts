import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import { userPasswordSchema, userSchema } from './users.schema';

const registerUserBodySchema = z.object({
	name: userSchema.shape.name,
	email: userSchema.shape.email,
	password: userPasswordSchema,
});

export const registerUserSchema = {
	summary: 'Register a new user.',
	tags: ['auth'],
	body: registerUserBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: userSchema,
		}),
		400: validationErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

const loginUserBodySchema = userSchema.pick({ email: true }).extend({
	password: z.string().trim(),
});

export const loginUserSchema = {
	summary: 'Login a user.',
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

export type RegisterUserBody = z.infer<typeof registerUserBodySchema>;
export type LoginUserBody = z.infer<typeof loginUserBodySchema>;

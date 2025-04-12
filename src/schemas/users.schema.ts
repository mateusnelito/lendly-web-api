import { z } from 'zod';
import { nameRegex, passwordRegex } from '../utils/regex.util';
import { validationErrorResponseSchema } from './error.schema';

const userSchema = z.object({
	id: z.string().trim().cuid2(),
	name: z.string().trim().regex(nameRegex).min(3).max(50),
	email: z.string().trim().email().max(50),
	isDeleted: z.boolean().default(false).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().nullable(),
});

const registerUserBodySchema = userSchema
	.pick({ name: true, email: true })
	.extend({
		password: z.string().trim().regex(passwordRegex).max(255),
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

export type RegisterUserBody = z.infer<typeof registerUserBodySchema>;

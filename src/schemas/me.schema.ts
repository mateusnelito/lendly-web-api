import { z } from 'zod';
import { userPasswordSchema } from './auth.schema';
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
		401: businessErrorResponseSchema,
	},
};

export const deleteMeSchema = {
	summary: 'Allow the current user delete her account.',
	tags: ['me'],
};

const updateMeBodySchema = userSchema
	.pick({ name: true, email: true })
	.extend({ password: userPasswordSchema.optional() });

export const updateMeSchema = {
	summary: 'Allow the current user update her data.',
	tags: ['me'],
	body: updateMeBodySchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: userSchema,
		}),
		400: validationErrorResponseSchema,
		401: validationErrorResponseSchema,
	},
};

export type UpdateMeBody = z.infer<typeof updateMeBodySchema>;

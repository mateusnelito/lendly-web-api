import { z } from 'zod';
import { validationErrorResponseSchema } from '../error.schema';
import { userPasswordSchema, userSchema } from '../users.schema';

const updateMeBodySchema = z.object({
	name: userSchema.shape.name,
	email: userSchema.shape.email,
	password: userPasswordSchema.optional(),
});

export const updateMeRouteSchema = {
	summary: 'Allow the current user update her data',
	description: 'Update user account data',
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

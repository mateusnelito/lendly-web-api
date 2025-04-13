import { z } from 'zod';
import { phoneRegex } from '../utils/regex.util';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import { userSchema } from './users.schema';

export const clientSchema = z.object({
	id: z.number().int().positive(),
	userId: userSchema.shape.id,
	name: userSchema.shape.name,
	email: userSchema.shape.email.nullable(),
	phone: z.string().trim().length(9).regex(phoneRegex),
	createdAt: userSchema.shape.createdAt,
	updatedAt: userSchema.shape.updatedAt,
});

const createClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

export const storeClientSchema = {
	summary: 'Register a new client to user.',
	tags: ['clients'],
	body: createClientBodySchema,
	response: {
		201: z.object({
			status: z.string().default('success'),
			data: clientSchema.omit({ userId: true }),
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export type CreateClientBody = z.infer<typeof createClientBodySchema>;

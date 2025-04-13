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
	summary: 'Register a new user client.',
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

const updateClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

const clientIdParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const updateClientSchema = {
	summary: 'Update a user client.',
	tags: ['clients'],
	body: updateClientBodySchema,
	params: clientIdParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: clientSchema.omit({ userId: true }),
		}),
		400: validationErrorResponseSchema,
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
		409: validationErrorResponseSchema,
	},
};

export const getClientSchema = {
	summary: 'Get a user client.',
	tags: ['clients'],
	params: clientIdParamsSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: clientSchema.omit({ userId: true }),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type CreateClientBody = z.infer<typeof createClientBodySchema>;
export type UpdateClientBody = z.infer<typeof updateClientBodySchema>;
export type ClientIdParams = z.infer<typeof clientIdParamsSchema>;

import { z } from 'zod';
import {
	businessErrorResponseSchema,
	validationErrorResponseSchema,
} from './error.schema';
import {
	createdAtSchema,
	emailSchema,
	intIdParamsSchema,
	intPositiveNumberSchema,
	nameSchema,
	phoneSchema,
	sizeQueryStringSchema,
	updatedAtSchema,
} from './primitive.schema';
import { userSchema } from './users.schema';

export const clientNameSchema = nameSchema;

export const clientSchema = z.object({
	id: intPositiveNumberSchema,
	userId: userSchema.shape.id,
	name: clientNameSchema,
	email: emailSchema.nullable(),
	phone: phoneSchema,
	createdAt: createdAtSchema,
	updatedAt: updatedAtSchema,
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
		// 409: validationErrorResponseSchema,
	},
};

const updateClientBodySchema = z.object({
	name: clientSchema.shape.name,
	phone: clientSchema.shape.phone,
	email: clientSchema.shape.email.optional(),
});

const clientIdParamsSchema = z.object({
	id: intIdParamsSchema,
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

const getClientsQueryStringSchema = z.object({
	q: z.string().optional(),
	size: sizeQueryStringSchema,
	cursor: intIdParamsSchema.optional(),
});

export const getClientsSchema = {
	summary: 'Get a user clients.',
	tags: ['clients'],
	querystring: getClientsQueryStringSchema,
	response: {
		200: z.object({
			status: z.string().default('success'),
			data: z.object({
				clients: z.array(clientSchema.omit({ userId: true })),
				nextCursor: intPositiveNumberSchema.optional(),
			}),
		}),
		401: businessErrorResponseSchema,
		404: businessErrorResponseSchema,
	},
};

export type CreateClientBody = z.infer<typeof createClientBodySchema>;
export type UpdateClientBody = z.infer<typeof updateClientBodySchema>;
export type ClientIdParams = z.infer<typeof clientIdParamsSchema>;
export type GetClientsQueryString = z.infer<typeof getClientsQueryStringSchema>;

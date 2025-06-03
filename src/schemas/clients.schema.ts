import { z } from 'zod';
import {
	createdAtSchema,
	emailSchema,
	intPositiveNumberSchema,
	nameSchema,
	phoneSchema,
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

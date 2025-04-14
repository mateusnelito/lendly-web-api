import { z } from 'zod';
import {
	createdAtSchema,
	emailSchema,
	nameSchema,
	passwordSchema,
	ulidSchema,
	updatedAtSchema,
} from './primitive.schema';

export const userSchema = z.object({
	id: ulidSchema,
	name: nameSchema,
	email: emailSchema,
	isDeleted: z.boolean().default(false).optional(),
	createdAt: createdAtSchema,
	updatedAt: updatedAtSchema,
});

export const userPasswordSchema = passwordSchema;

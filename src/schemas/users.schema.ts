import { z } from 'zod';
import {
	createdAtSchema,
	emailSchema,
	nameSchema,
	nullableTimestampSchema,
	strongPasswordSchema,
} from './primitive.schema';

export const userSchema = z.object({
	id: z.string().trim().ulid(),
	name: nameSchema,
	email: emailSchema,
	isDeleted: z.boolean().default(false).optional(),
	createdAt: createdAtSchema,
	updatedAt: nullableTimestampSchema,
});

export const userPasswordSchema = strongPasswordSchema;

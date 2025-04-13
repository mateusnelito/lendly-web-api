import { z } from 'zod';
import { nameRegex, passwordRegex } from '../utils/regex.util';

export const userSchema = z.object({
	id: z.string().trim().cuid2(),
	name: z.string().trim().regex(nameRegex).min(3).max(50),
	email: z.string().trim().email().max(50),
	isDeleted: z.boolean().default(false).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().nullable(),
});

export const userPasswordSchema = z
	.string()
	.trim()
	.regex(passwordRegex)
	.max(255);

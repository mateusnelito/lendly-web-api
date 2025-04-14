import { z } from 'zod';
import {
	descriptionRegex,
	nameRegex,
	passwordRegex,
	phoneRegex,
} from '../utils/regex.util';

export const ulidSchema = z.string().trim().ulid();
export const nameSchema = z.string().trim().regex(nameRegex).min(3).max(50);
export const emailSchema = z.string().trim().email().max(255);
export const phoneSchema = z.string().trim().length(9).regex(phoneRegex);
export const passwordSchema = z.string().trim().regex(passwordRegex).max(255);
export const createdAtSchema = z.date().optional();
export const updatedAtSchema = z.date().nullable();
export const descriptionSchema = z
	.string()
	.trim()
	.min(3)
	.max(100)
	.regex(descriptionRegex);
export const intIdSchema = z.number().int().positive();
export const intIdParamsSchema = z.coerce.number().int().positive();
export const sizeQueryStringSchema = z.coerce
	.number()
	.int()
	.min(10)
	.max(50)
	.default(10);

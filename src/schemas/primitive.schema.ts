import { z } from 'zod';
import { humanNameRegex, strongPasswordRegex } from '../utils/regex.util';

export const nameSchema = z
	.string()
	.trim()
	.regex(humanNameRegex)
	.min(3)
	.max(50);

export const emailSchema = z.string().trim().email().max(255);

export const strongPasswordSchema = z
	.string()
	.trim()
	.regex(strongPasswordRegex)
	.max(255);

export const createdAtSchema = z.date().optional();

export const nullableTimestampSchema = z.date().nullable();

export const numberIntPositiveSchema = z.number().int().positive();

export const coercedNumberIntSchema = z.coerce.number().int().positive();

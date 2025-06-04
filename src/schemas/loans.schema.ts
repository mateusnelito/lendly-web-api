import { z } from 'zod';
import { safeDescriptionRegex } from '../utils/regex.util';
import { clientSchema } from './clients.schema';
import {
	createdAtSchema,
	nullableTimestampSchema,
	numberIntPositiveSchema,
} from './primitive.schema';

export const loanSchema = z.object({
	id: numberIntPositiveSchema,
	clientId: clientSchema.shape.id,
	amountGiven: numberIntPositiveSchema,
	baseDueDate: z.string().date(),
	isPaid: z.boolean().default(false),
	hasInterest: z.boolean().default(false),
	interestValuePerMonth: numberIntPositiveSchema.nullable(),
	notes: z
		.string()
		.trim()
		.min(3)
		.max(100)
		.regex(safeDescriptionRegex)
		.nullable(),
	createdAt: createdAtSchema,
	updatedAt: nullableTimestampSchema,
});

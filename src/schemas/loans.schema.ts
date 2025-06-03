import { z } from 'zod';
import { clientSchema } from './clients.schema';
import {
	createdAtSchema,
	descriptionSchema,
	intPositiveNumberSchema,
	updatedAtSchema,
} from './primitive.schema';
import { userSchema } from './users.schema';

export const loanSchema = z.object({
	id: intPositiveNumberSchema,
	clientId: clientSchema.shape.id,
	userId: userSchema.shape.id,
	amountGiven: intPositiveNumberSchema,
	baseDueDate: z.string().date(),
	isPaid: z.boolean().default(false),
	hasInterest: z.boolean().default(false),
	interestValuePerMonth: intPositiveNumberSchema.nullable(),
	notes: descriptionSchema.nullable(),
	createdAt: createdAtSchema,
	updatedAt: updatedAtSchema,
});

import { z } from 'zod';
import { loanSchema } from './loans.schema';
import { intPositiveNumberSchema, updatedAtSchema } from './primitive.schema';
import { userSchema } from './users.schema';

export const paymentSchema = z.object({
	id: intPositiveNumberSchema,
	userId: userSchema.shape.id,
	loanId: loanSchema.shape.id,
	amount: intPositiveNumberSchema,
	date: z.date(),
	deletedAt: updatedAtSchema,
});

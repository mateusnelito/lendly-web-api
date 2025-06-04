import { z } from 'zod';
import { loanSchema } from '../loans/base.schema';
import {
	nullableTimestampSchema,
	numberIntPositiveSchema,
} from '../primitive.schema';

export const paymentSchema = z.object({
	id: numberIntPositiveSchema,
	loanId: loanSchema.shape.id,
	amount: numberIntPositiveSchema,
	date: z.date(),
	deletedAt: nullableTimestampSchema,
});

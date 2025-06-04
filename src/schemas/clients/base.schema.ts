import { z } from 'zod';
import { angolanPhoneRegex } from '../../utils/regex.util';
import {
	createdAtSchema,
	emailSchema,
	nameSchema,
	nullableTimestampSchema,
	numberIntPositiveSchema,
} from '../primitive.schema';

export const clientSchema = z.object({
	id: numberIntPositiveSchema,
	name: nameSchema,
	email: emailSchema.nullable(),
	phone: z.string().trim().length(9).regex(angolanPhoneRegex),
	createdAt: createdAtSchema,
	updatedAt: nullableTimestampSchema,
});

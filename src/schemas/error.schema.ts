import { z } from 'zod';

export const clientErrorSchema = z.record(
	z.string(),
	z.array(z.string()).or(z.record(z.string(), z.array(z.string())))
);

export const validationErrorResponseSchema = z.object({
	status: z.string().default('fail'),
	data: z.object({
		message: z.string(),
		errors: clientErrorSchema,
	}),
	code: z.number().default(400),
});

export const businessErrorResponseSchema = z.object({
	status: z.string().default('fail'),
	data: z.object({
		message: z.string(),
	}),
	code: z.number().default(404),
});

export type clientErrorType = z.infer<typeof clientErrorSchema>;

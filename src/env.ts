import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().int().positive().default(3000),
	JWT_SECRET: z.string(),
	JWT_EXPIRATION: z.coerce.number().default(604800), // 7d
	DATABASE_URL_DEV: z.string().url(),
	DATABASE_URL_PROD: z.string().url(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(
		'Erro de validação das variáveis de ambiente:',
		result.error.errors
	);
	process.exit(1);
}

export const env = result.data;

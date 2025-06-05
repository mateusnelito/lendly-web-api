import { z } from 'zod';

const baseEnvSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().int().positive().default(3000),
	JWT_SECRET: z.string(),
	JWT_EXPIRATION: z.coerce.number().default(604800), // 7d
});

const devEnvSchema = baseEnvSchema.extend({
	DATABASE_URL_DEV: z.string().url(),
	DATABASE_URL_PROD: z.string().url().optional(),
});

const prodEnvSchema = baseEnvSchema.extend({
	DATABASE_URL_PROD: z.string().url(),
	DATABASE_URL_DEV: z.string().url().optional(),
});

const envMode = process.env.NODE_ENV as 'development' | 'production' | 'test';

const envSchema = envMode === 'production' ? prodEnvSchema : devEnvSchema;

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(
		'Erro de validação das variáveis de ambiente:',
		result.error.errors
	);
	process.exit(1);
}

export const env = result.data;

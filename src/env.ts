import { z } from 'zod';

const envSchema = z.object({
	// ENVIRONMENT
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().int().positive().default(3000),

	// DATABASE
	DATABASE_URL_DEV: z.string().url(),
	DATABASE_URL_PROD: z.string().url(),

	// JWT
	JWT_SECRET: z.string(),
	JWT_EXPIRATION: z.coerce.number().default(604800), // 604800 -> 7d
});

const envSchemaParseResult = envSchema.safeParse(process.env);

if (!envSchemaParseResult.success) {
	console.error(
		'Erro de validação das variáveis de ambiente:',
		envSchemaParseResult.error.errors
	);
	process.exit(1);
}

export const env = envSchemaParseResult.data;

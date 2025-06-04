import { z } from 'zod';

const envSchema = z.object({
	// APP
	PORT: z.coerce.number().int().positive().default(3000),
	DATABASE_URL: z.string().url(),

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

import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

const DATABASE_URL =
	env.NODE_ENV === 'production' ? env.DATABASE_URL_PROD : env.DATABASE_URL_DEV;

export default defineConfig({
	out: './drizzle/migrations',
	schema: './src/db/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URL,
	},
});

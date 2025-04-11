import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
	out: './drizzle/migrations',
	schema: './src/db/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});

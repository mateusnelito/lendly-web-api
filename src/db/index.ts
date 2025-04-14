import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../env';

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	connectionTimeoutMillis: 2000,
	idleTimeoutMillis: 10000,
	max: 10,
	allowExitOnIdle: false,
});

export const db = drizzle({
	client: pool,
	// FIXME: DISABLE IN PRODUCTION
	logger: true,
});

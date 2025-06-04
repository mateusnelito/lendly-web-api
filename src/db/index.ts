import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../env';

const isProd = env.NODE_ENV === 'production';
const DATABASE_URL = isProd ? env.DATABASE_URL_PROD : env.DATABASE_URL_DEV;

let db: NodePgDatabase;

if (isProd) {
	db = drizzle(DATABASE_URL);
} else {
	const pool = new Pool({
		connectionString: DATABASE_URL,
		connectionTimeoutMillis: 2000,
		idleTimeoutMillis: 10000,
		max: 10,
		allowExitOnIdle: false,
	});

	db = drizzle(pool, {
		logger: true,
	});
}

export { db };

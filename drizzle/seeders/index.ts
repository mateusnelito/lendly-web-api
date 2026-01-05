import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from '../../src/db/schema/users';
import { env } from '../../src/env';
import { hashPassword } from '../../src/utils/bcrypt.util';

const seedPool = new Pool({
	// Obs.: Seed only available on dev mode
	connectionString: env.DATABASE_URL_DEV,
	max: 1,
	idleTimeoutMillis: 1000,
});

const db = drizzle(seedPool, { logger: true });

async function seed() {
	console.log('🌱 Plantando seeds...\n');

	await db.delete(users);

	const passwordHash = await hashPassword('Password@1234');

	await db.insert(users).values([
		{ name: 'Mateus Nelito', email: 'mateusnelito@gmail.com', passwordHash },
		{ name: 'Ana Vale', email: 'anavale@gmail.com', passwordHash },
	]);
}

seed()
	.catch(error => {
		console.error('❌ Seed falhou:', error);
		process.exit(1);
	})
	.finally(async () => {
		await seedPool.end();
		console.log('\n✅ Seeds plantados!');
	});

import { db, pool } from '../../src/db';
import { users } from '../../src/db/schema/users';
import { hashPassword } from '../../src/utils/bcrypt.util';

async function main() {
	await db.delete(users);

	const passwordHash = await hashPassword('Password@1234');

	await db.insert(users).values([
		{
			name: 'Mateus Nelito',
			email: 'mateusnelito@gmail.com',
			passwordHash,
		},
		{
			name: 'Ana Vale',
			email: 'anavale@gmail.com',
			passwordHash,
		},
	]);

	// Closing connection with db
	await pool.end();
}
main();

import { JWT } from '@fastify/jwt';
import { env } from '../env';
import { throwInvalidUserCredentials } from '../utils/auth.util';
import { comparePassword } from '../utils/bcrypt.util';
import { findUserByEmail } from './users.service';

export async function authUser(email: string, password: string, jwt: JWT) {
	const user = await findUserByEmail(email);

	if (!user) throwInvalidUserCredentials();

	const isPasswordMatch = await comparePassword(password, user.passwordHash);

	if (!isPasswordMatch) throwInvalidUserCredentials();

	const { id } = user;

	const accessToken = jwt.sign(
		{ user: { id } },
		{ expiresIn: env.JWT_EXPIRATION }
	);

	return {
		accessToken,
		user: { id, email },
	};
}

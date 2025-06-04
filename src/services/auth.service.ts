import { JWT } from '@fastify/jwt';
import { env } from '../env';
import { LoginUserBody } from '../schemas/auth/login.schema';
import { RegisterUserBody } from '../schemas/auth/register.schema';
import { throwInvalidUserCredentials } from '../utils/auth.util';
import { comparePassword } from '../utils/bcrypt.util';
import { createUser, findUserByEmail } from './users.service';

export async function authUser(data: LoginUserBody, jwt: JWT) {
	const { email, password } = data;

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

export async function registerUser(data: RegisterUserBody, jwt: JWT) {
	const user = await createUser(data);

	const { id } = user;

	const accessToken = jwt.sign(
		{ user: { id } },
		{ expiresIn: env.JWT_EXPIRATION }
	);

	return {
		user,
		accessToken,
	};
}

import { throwInvalidUserCredentials } from '../utils/auth.util';
import { comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { findUserByEmail } from './users.service';

export async function authUser(email: string, password: string) {
	const user = await findUserByEmail(email);

	if (!user) throwInvalidUserCredentials();

	const isPasswordMatch = await comparePassword(password, user.passwordHash);

	if (!isPasswordMatch) throwInvalidUserCredentials();

	const { id } = user;

	const accessToken = generateToken({ user: { id } });

	return {
		accessToken,
		user: { id, email },
	};
}

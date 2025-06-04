import { userPasswordSchema } from '../schemas/users.schema';
import { findUserEmail } from '../services/users.service';
import { throwInvalidUserCredentials } from '../utils/auth.util';
import ClientError from '../utils/client-error.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function ensureUserEmailIsAvailable(
	email: string,
	userId?: string
) {
	const user = await findUserEmail(email, userId);

	if (user)
		throw new ClientError('Email invalido', HttpStatusCodes.CONFLICT, {
			email: ['Já existe uma conta com este email'],
		});

	return user;
}

export async function ensureUserPasswordIsStrong(password: string) {
	const parsedUserPassword = userPasswordSchema.safeParse(password);

	if (!parsedUserPassword.success) throwInvalidUserCredentials();
}

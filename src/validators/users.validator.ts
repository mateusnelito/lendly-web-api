import { findUserUserEmail } from '../services/users.service';
import ClientError from '../utils/client-error.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function ensureUserEmailIsAvailable(
	email: string,
	userId?: string
) {
	const user = await findUserUserEmail(email, userId);

	if (user)
		throw new ClientError('Email invalido.', HttpStatusCodes.CONFLICT, {
			email: ['Já existe um usuário com este email.'],
		});

	return user;
}

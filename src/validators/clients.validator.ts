import {
	FindClientByPhoneOrOptionalEmail,
	findClientByPhoneOrOptionalEmail,
} from '../services/clients.service';
import ClientError from '../utils/client-error.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export async function ensureClientContactsIsAvailable(
	params: FindClientByPhoneOrOptionalEmail
) {
	const { phone, email, userId, excludedId } = params;

	const client = await findClientByPhoneOrOptionalEmail({
		phone,
		userId,
		email,
		excludedId,
	});

	if (!client) return;

	if (client?.phone === phone)
		throw new ClientError('Telefone inválido.', HttpStatusCodes.CONFLICT, {
			phone: ['Já existe um cliente com este email..'],
		});

	if (email && client?.email === email)
		throw new ClientError('Email inválido.', HttpStatusCodes.CONFLICT, {
			email: ['Já existe um cliente com este email.'],
		});
}

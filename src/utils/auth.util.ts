import ClientError from './client-error.util';
import { HttpStatusCodes } from './http-status-codes.util';

export function throwInvalidUserCredentials() {
	throw new ClientError('Credenciais inválidas.', HttpStatusCodes.UNAUTHORIZED);
}

export function throwInvalidAuthUserJWT() {
	throw new ClientError(
		'Sessão expirada ou inválida.',
		HttpStatusCodes.UNAUTHORIZED
	);
}

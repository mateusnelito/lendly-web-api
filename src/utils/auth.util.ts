import ClientError from './client-error.util';
import { HttpStatusCodes } from './http-status-codes.util';

export function throwInvalidUserCredentials() {
	throw new ClientError('Acesso negado', HttpStatusCodes.UNAUTHORIZED, {
		password: ['Credenciais inválidas'],
	});
}

export function throwInvalidAuthUserJWT() {
	throw new ClientError(
		'Sessão expirada ou inválida.',
		HttpStatusCodes.UNAUTHORIZED
	);
}

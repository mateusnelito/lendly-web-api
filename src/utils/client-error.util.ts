import { clientErrorType } from '../schemas/error.schema';
import { HttpStatusCodes } from './http-status-codes.util';

export default class ClientError extends Error {
	public readonly statusCode: number;
	public readonly errors?: clientErrorType;

	constructor(message: string, statusCode?: number, errors?: clientErrorType) {
		super(message);
		this.name = 'ClientError';
		this.errors = errors;
		this.statusCode = statusCode ?? HttpStatusCodes.BAD_REQUEST;
	}
}

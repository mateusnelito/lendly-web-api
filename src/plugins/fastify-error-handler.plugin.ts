import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ResponseStatus } from '../types/response-status.type';
import ClientError from '../utils/client-error.util';
import { formatZodValidationErrors } from '../utils/format-zod-validation-errors.util';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export default fastifyPlugin(async (server: FastifyInstance) => {
	server.setErrorHandler((err, _, reply) => {
		if (hasZodFastifySchemaValidationErrors(err)) {
			const { validation, validationContext } = err;

			return reply.code(HttpStatusCodes.BAD_REQUEST).send({
				status: ResponseStatus.FAIL,
				data: {
					message: `Invalid ${validationContext} input`,
					errors: formatZodValidationErrors(validation),
					code: HttpStatusCodes.BAD_REQUEST,
				},
			});
		}

		// Client Errors
		if (err instanceof ClientError) {
			const { statusCode: code, message, errors } = err;
			return reply
				.status(code)
				.send({ status: ResponseStatus.FAIL, data: { message, errors, code } });
		}

		console.log(err);

		return reply.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
			status: ResponseStatus.FAIL,
			data: {
				message: 'Internal server error!',
				code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
			},
		});
	});
});

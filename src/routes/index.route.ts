import { FastifyPluginAsync } from 'fastify';
import { HttpStatusCodes } from '../utils/http-status-codes.util';

export const routes: FastifyPluginAsync = async server => {
	// Define the 404 route
	server.setNotFoundHandler((_, reply) => {
		return reply.status(HttpStatusCodes.NOT_FOUND).send({
			statusCode: HttpStatusCodes.NOT_FOUND,
			message: 'Route not found',
		});
	});
};

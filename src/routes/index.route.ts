import { FastifyPluginAsync } from 'fastify';
import { HttpStatusCodes } from '../utils/http-status-codes.util';
import { authRoutes } from './auth.route';
import { clientRoutes } from './clients.route';
import { loanRoutes } from './loans.route';
import { meRoutes } from './me.route';
import { paymentRoutes } from './payments.route';

export const routes: FastifyPluginAsync = async server => {
	// Define the 404 route
	server.setNotFoundHandler((_, reply) => {
		return reply.status(HttpStatusCodes.NOT_FOUND).send({
			statusCode: HttpStatusCodes.NOT_FOUND,
			message: 'Route not found',
		});
	});
	server.register(authRoutes, { prefix: '/auth' });
	server.register(meRoutes, { prefix: '/me' });
	server.register(clientRoutes, { prefix: '/clients' });
	server.register(loanRoutes, { prefix: '/loans' });
	server.register(paymentRoutes, { prefix: '/payments' });
};

import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createPaymentController,
	deletePaymentController,
	getPaymentController,
} from '../controllers/payments.controller';
import {
	createPaymentSchema,
	deletePaymentSchema,
	getPaymentSchema,
} from '../schemas/payments.schema';

export const paymentRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createPaymentSchema,
		preHandler: [server.authenticate],
		handler: createPaymentController,
	});

	server.withTypeProvider<ZodTypeProvider>().delete('/:id', {
		schema: deletePaymentSchema,
		preHandler: [server.authenticate],
		handler: deletePaymentController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getPaymentSchema,
		preHandler: [server.authenticate],
		handler: getPaymentController,
	});
};

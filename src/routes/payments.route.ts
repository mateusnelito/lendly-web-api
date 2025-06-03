import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createPaymentController,
	deletePaymentController,
	getPaymentController,
	getPaymentsController,
} from '../controllers/payments.controller';
import { createPaymentRouteSchema } from '../schemas/payments/create.schema';
import { getPaymentRouteSchema } from '../schemas/payments/detail.schema';
import { getPaymentsRouteSchema } from '../schemas/payments/list.schema';
import { deletePaymentRouteSchema } from '../schemas/payments/remove.schema';

export const paymentRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createPaymentRouteSchema,
		preHandler: [server.authenticate],
		handler: createPaymentController,
	});

	server.withTypeProvider<ZodTypeProvider>().delete('/:id', {
		schema: deletePaymentRouteSchema,
		preHandler: [server.authenticate],
		handler: deletePaymentController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getPaymentRouteSchema,
		preHandler: [server.authenticate],
		handler: getPaymentController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getPaymentsRouteSchema,
		preHandler: [server.authenticate],
		handler: getPaymentsController,
	});
};

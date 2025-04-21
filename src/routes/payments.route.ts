import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createPaymentController } from '../controllers/payments.controller';
import { createPaymentSchema } from '../schemas/payments.schema';

export const paymentRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createPaymentSchema,
		preHandler: [server.authenticate],
		handler: createPaymentController,
	});
};

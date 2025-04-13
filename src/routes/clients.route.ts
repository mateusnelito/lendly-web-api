import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { storeClientController } from '../controllers/clients.controller';
import { storeClientSchema } from '../schemas/clients.schema';

export const clientRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: storeClientSchema,
		preHandler: [server.authenticate],
		handler: storeClientController,
	});
};

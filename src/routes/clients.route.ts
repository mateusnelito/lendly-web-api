import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	getClientController,
	storeClientController,
	updateClientController,
} from '../controllers/clients.controller';
import {
	getClientSchema,
	storeClientSchema,
	updateClientSchema,
} from '../schemas/clients.schema';

export const clientRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: storeClientSchema,
		preHandler: [server.authenticate],
		handler: storeClientController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/:id', {
		schema: updateClientSchema,
		preHandler: [server.authenticate],
		handler: updateClientController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getClientSchema,
		preHandler: [server.authenticate],
		handler: getClientController,
	});
};

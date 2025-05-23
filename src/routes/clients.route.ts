import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createClientController,
	getClientController,
	getClientsController,
	updateClientController,
} from '../controllers/clients.controller';
import {
	createClientSchema,
	getClientSchema,
	getClientsSchema,
	updateClientSchema,
} from '../schemas/clients.schema';

export const clientRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createClientSchema,
		preHandler: [server.authenticate],
		handler: createClientController,
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

	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getClientsSchema,
		preHandler: [server.authenticate],
		handler: getClientsController,
	});
};

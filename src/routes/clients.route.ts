import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createClientController } from '../controllers/clients/create.controller';
import { getClientController } from '../controllers/clients/detail.controller';
import { getClientsController } from '../controllers/clients/list.controller';
import { updateClientController } from '../controllers/clients/update.controller';
import { createClientRouteSchema } from '../schemas/clients/create.schema';
import { getClientRouteSchema } from '../schemas/clients/detail.schema';
import { getClientsRouteSchema } from '../schemas/clients/list.schema';
import { updateClientRouteSchema } from '../schemas/clients/update.schema';

export const clientRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createClientRouteSchema,
		preHandler: [server.authenticate],
		handler: createClientController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/:id', {
		schema: updateClientRouteSchema,
		preHandler: [server.authenticate],
		handler: updateClientController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getClientRouteSchema,
		preHandler: [server.authenticate],
		handler: getClientController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getClientsRouteSchema,
		preHandler: [server.authenticate],
		handler: getClientsController,
	});
};

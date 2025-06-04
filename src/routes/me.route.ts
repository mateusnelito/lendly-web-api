import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getMeController } from '../controllers/me/detail.controller';
import { updateMeController } from '../controllers/me/update.controller';
import { getMeRouteSchema } from '../schemas/me/detail.schema';
import { updateMeRouteSchema } from '../schemas/me/update.schema';

export const meRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getMeRouteSchema,
		preHandler: [server.authenticate],
		handler: getMeController,
	});

	// server.withTypeProvider<ZodTypeProvider>().delete('/', {
	// 	schema: deleteMeRouteSchema,
	// 	preHandler: [server.authenticate],
	// 	handler: deleteMeController,
	// });

	server.withTypeProvider<ZodTypeProvider>().put('/', {
		schema: updateMeRouteSchema,
		preHandler: [server.authenticate],
		handler: updateMeController,
	});
};

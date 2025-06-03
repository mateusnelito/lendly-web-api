import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	deleteMeController,
	getMeController,
	updateMeController,
} from '../controllers/me.controller';
import { getMeRouteSchema } from '../schemas/me/detail.schema';
import { deleteMeRouteSchema } from '../schemas/me/remove.schema';
import { updateMeRouteSchema } from '../schemas/me/update.schema';

export const meRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getMeRouteSchema,
		preHandler: [server.authenticate],
		handler: getMeController,
	});

	server.withTypeProvider<ZodTypeProvider>().delete('/', {
		schema: deleteMeRouteSchema,
		preHandler: [server.authenticate],
		handler: deleteMeController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/', {
		schema: updateMeRouteSchema,
		preHandler: [server.authenticate],
		handler: updateMeController,
	});
};

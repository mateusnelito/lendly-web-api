import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	deleteMeController,
	getMeController,
	updateMeController,
} from '../controllers/me.controller';
import {
	deleteMeSchema,
	getMeSchema,
	updateMeSchema,
} from '../schemas/me.schema';

export const meRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getMeSchema,
		preHandler: [server.authenticate],
		handler: getMeController,
	});

	server.withTypeProvider<ZodTypeProvider>().delete('/', {
		schema: deleteMeSchema,
		preHandler: [server.authenticate],
		handler: deleteMeController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/', {
		schema: updateMeSchema,
		preHandler: [server.authenticate],
		handler: updateMeController,
	});
};

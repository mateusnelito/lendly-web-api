import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getMeController } from '../controllers/me.controller';
import { getMeSchema } from '../schemas/me.schema';

export const meRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getMeSchema,
		preHandler: [server.authenticate],
		handler: getMeController,
	});
};

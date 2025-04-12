import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerUserController } from '../controllers/auth.controller';
import { registerUserSchema } from '../schemas/users.schema';

export const authRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/register', {
		schema: registerUserSchema,
		handler: registerUserController,
	});
};

import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { loginUserController } from '../controllers/auth/login.controller';
import { registerUserController } from '../controllers/auth/register.controller';
import { loginUserRouteSchema } from '../schemas/auth/login.schema';
import { registerUserRouteSchema } from '../schemas/auth/register.schema';

export const authRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/register', {
		schema: registerUserRouteSchema,
		handler: registerUserController,
	});

	server.withTypeProvider<ZodTypeProvider>().post('/login', {
		schema: loginUserRouteSchema,
		handler: loginUserController,
	});
};

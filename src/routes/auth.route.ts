import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	loginUserController,
	registerUserController,
} from '../controllers/auth.controller';
import { loginUserSchema, registerUserSchema } from '../schemas/auth.schema';

export const authRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/register', {
		schema: registerUserSchema,
		handler: registerUserController,
	});

	server.withTypeProvider<ZodTypeProvider>().post('/login', {
		schema: loginUserSchema,
		handler: loginUserController,
	});
};

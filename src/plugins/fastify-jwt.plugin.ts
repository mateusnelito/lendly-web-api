import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { env } from '../env';
import { AuthUserPayload } from '../types/auth.type';
import { throwInvalidAuthUserJWT } from '../utils/auth.util';

export default fastifyPlugin(async (server: FastifyInstance) => {
	server.register(fastifyJwt, {
		secret: env.JWT_SECRET,
	});

	server.decorate('authenticate', async (request: FastifyRequest) => {
		try {
			const jwtPayload = await request.jwtVerify<{ user: AuthUserPayload }>();
			request.user = jwtPayload.user;
		} catch (_) {
			throwInvalidAuthUserJWT();
		}
	});
});

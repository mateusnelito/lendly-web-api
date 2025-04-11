import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async (server: FastifyInstance) => {
	const ALLOWED_ORIGINS = ['*'];

	server.register(fastifyCors, {
		origin: ALLOWED_ORIGINS,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	});
});

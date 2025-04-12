import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fastifyPlugin(async server => {
	server.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'Lendly API',
				description: 'API for managing informal loans and payments per user.',
				version: '1.0.0',
			},

			host: 'localhost:3000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				{
					name: 'auth',
					description: 'User registration and login.',
				},
				{
					name: 'users',
					description: 'Authenticated user info.',
				},
				{
					name: 'clients',
					description: 'Client management.',
				},
				{
					name: 'loans',
					description: 'Loan creation and tracking.',
				},
				{
					name: 'payments',
					description: 'Payments for loans.',
				},
				{
					name: 'me',
					description: 'Authenticated User details and management.',
				},
			],
		},
		transform: jsonSchemaTransform,
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/swagger',
	});
});

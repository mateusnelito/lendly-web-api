import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fastifyPlugin(async server => {
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Lendly API',
				description: 'API for managing informal loans and payments per user',
				version: '1.0.0',
				contact: {
					name: 'Mateus Nelito',
					url: 'https://github.com/mateusnelito',
					email: 'mateuscelestinofreacker@gmail.com',
				},
			},
			servers: [
				{
					url: 'https://lendly-web-api.onrender.com',
					description: 'Production server',
				},
				{
					url: 'http://localhost:3000',
					description: 'Development server',
				},
			],
			tags: [
				{
					name: 'auth',
					description: 'User registration and login.',
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
					description: 'Authenticated user details and management.',
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'apiKey',
						name: 'Authorization',
						in: 'header',
					},
				},
			},
			security: [{ bearerAuth: [] }],
			externalDocs: {
				url: 'https://github.com/mateusnelito/lendly-web-api',
				description: 'Find more info here',
			},
		},
		transform: jsonSchemaTransform,
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/docs',
	});
});

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fastifyPlugin(async server => {
	server.register(fastifySwagger, {
		swagger: {
			info: {
				title: '',
				description: '',
				version: '1.0.0',
			},

			host: 'localhost:3000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				// {
				// 	name: '',
				// 	description: '',
				// },
			],
		},
		transform: jsonSchemaTransform,
	});

	server.register(fastifySwaggerUi, {
		routePrefix: '/swagger',
	});
});

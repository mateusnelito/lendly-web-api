import fastifyHelmet from '@fastify/helmet';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async server => {
	server.register(fastifyHelmet, {
		global: true,
	});
});

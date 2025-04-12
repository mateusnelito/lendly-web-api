import fastify from 'fastify';
import { env } from './env';
import errorHandlerPlugin from './plugins/error-handler.plugin';
import fastifyCorsPlugin from './plugins/fastify-cors.plugin';
import fastifySwaggerPlugin from './plugins/fastify-swagger.plugin';
import fastifyTypeProviderZodPlugin from './plugins/fastify-type-provider-zod.plugin';
import { routes } from './routes/index.route';

const server = fastify();

// Register plugins
server.register(fastifyCorsPlugin);
server.register(fastifyTypeProviderZodPlugin);
server.register(errorHandlerPlugin);
server.register(fastifySwaggerPlugin);

// Register routes
server.register(routes);

// start server
server
	.listen({ port: env.PORT })
	.then(() => {
		console.log(`🔥 API Running on :${env.PORT}`);
	})
	.catch(err => {
		console.error(`🛑 Error starting API: \n ${err}`);
		process.exit(1);
	});

// graceful shutdown
const signalListeners = ['SIGINT', 'SIGTERM'];
for (const signal of signalListeners) {
	process.on(signal, async () => {
		await server.close();
		process.exit(0);
	});
}

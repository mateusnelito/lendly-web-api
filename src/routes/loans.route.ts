import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { storeLoanController } from '../controllers/loans.controller';
import { storeLoanSchema } from '../schemas/loans.schema';

export const loanRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: storeLoanSchema,
		preHandler: [server.authenticate],
		handler: storeLoanController,
	});
};

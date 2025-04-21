import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	storeLoanController,
	updateLoanController,
} from '../controllers/loans.controller';
import { storeLoanSchema, updateLoanSchema } from '../schemas/loans.schema';

export const loanRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: storeLoanSchema,
		preHandler: [server.authenticate],
		handler: storeLoanController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/:id', {
		schema: updateLoanSchema,
		preHandler: [server.authenticate],
		handler: updateLoanController,
	});
};

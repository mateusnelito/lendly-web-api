import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createLoanController,
	updateLoanController,
} from '../controllers/loans.controller';
import { createLoanSchema, updateLoanSchema } from '../schemas/loans.schema';

export const loanRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createLoanSchema,
		preHandler: [server.authenticate],
		handler: createLoanController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/:id', {
		schema: updateLoanSchema,
		preHandler: [server.authenticate],
		handler: updateLoanController,
	});
};

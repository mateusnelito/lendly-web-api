import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createLoanController,
	getLoanController,
	getLoansController,
	updateLoanController,
} from '../controllers/loans.controller';
import {
	createLoanSchema,
	getLoanSchema,
	getLoansSchema,
	updateLoanSchema,
} from '../schemas/loans.schema';

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

	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getLoansSchema,
		preHandler: [server.authenticate],
		handler: getLoansController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getLoanSchema,
		preHandler: [server.authenticate],
		handler: getLoanController,
	});
};

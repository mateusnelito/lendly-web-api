import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	createLoanController,
	getLoanController,
	getLoansController,
	updateLoanController,
} from '../controllers/loans.controller';
import { createLoanRouteSchema } from '../schemas/loans/create.schema';
import { getLoanRouteSchema } from '../schemas/loans/detail.schema';
import { getLoansRouteSchema } from '../schemas/loans/list.schema';
import { updateLoanRouteSchema } from '../schemas/loans/update.schema';

export const loanRoutes: FastifyPluginAsync = async server => {
	server.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: createLoanRouteSchema,
		preHandler: [server.authenticate],
		handler: createLoanController,
	});

	server.withTypeProvider<ZodTypeProvider>().put('/:id', {
		schema: updateLoanRouteSchema,
		preHandler: [server.authenticate],
		handler: updateLoanController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/', {
		schema: getLoansRouteSchema,
		preHandler: [server.authenticate],
		handler: getLoansController,
	});

	server.withTypeProvider<ZodTypeProvider>().get('/:id', {
		schema: getLoanRouteSchema,
		preHandler: [server.authenticate],
		handler: getLoanController,
	});
};

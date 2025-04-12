import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload } from 'jsonwebtoken';
import { AuthUserPayload } from './auth.type';

declare module 'fastify' {
	export interface FastifyRequest {
		user: AuthUserPayload;
	}

	export interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply
		) => Promise<void>;
	}
}

import '@fastify/jwt';
import { AuthUserPayload } from './auth.type';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: AuthUserPayload;
	}
}

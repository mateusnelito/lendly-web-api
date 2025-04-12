import 'jsonwebtoken';
import { AuthUserPayload } from './auth.type';

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		user: AuthUserPayload;
	}
}

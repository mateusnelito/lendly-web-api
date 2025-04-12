import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { env } from '../env';

export function generateToken(payload: object, options?: SignOptions): string {
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRATION,
		...options,
	});
}

export function verifyToken<T extends JwtPayload>(token: string): T | null {
	try {
		return jwt.verify(token, env.JWT_SECRET) as T;
	} catch (error) {
		return null;
	}
}

export function getTokenPayload(token: string | undefined) {
	if (!token) return null;
	return verifyToken(token);
}

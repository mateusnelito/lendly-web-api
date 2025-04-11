import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { env } from '../env';

// Generate a JWT token
export function generateToken(payload: object, options?: SignOptions): string {
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRATION,
		...options,
	});
}

// Verify and decode a JWT token
export function verifyToken<T extends JwtPayload>(token: string): T | null {
	try {
		return jwt.verify(token, env.JWT_SECRET) as T;
	} catch (error) {
		return null; // Return null for expired token
	}
}

export function getTokenPayload(token: string | undefined) {
	if (!token) return null;
	return verifyToken(token);
}

import { eq } from 'drizzle-orm';
import { clients } from '../db/schema/clients';

export function byUserIdEquals(userId: string) {
	return eq(clients.userId, userId);
}

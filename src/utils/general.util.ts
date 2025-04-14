export function getNextCursor<T extends { id: string | number }>(
	data: T[],
	size: number
) {
	return data.length === size ? data[data.length - 1].id : undefined;
}

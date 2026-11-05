type ErrorResponse = {
	error?: unknown;
};

export async function backendError(response: Response, fallback: string): Promise<string> {
	try {
		const data = (await response.json()) as ErrorResponse;
		return typeof data.error === 'string' ? data.error : fallback;
	} catch {
		return fallback;
	}
}

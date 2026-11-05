import type { RequestEvent } from '@sveltejs/kit';
import { backendError } from './backend-error.js';

export async function verifyMagicLink(event: RequestEvent, token: string) {
	const response = await event.locals.apiFetch('/auth/verify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ token })
	});

	if (!response.ok) {
		throw new Error(await backendError(response, 'This sign-in link is invalid or has expired.'));
	}

	const data = (await response.json()) as { token?: string };
	if (!data.token) throw new Error('The server did not return a session token.');

	event.cookies.set('session', data.token, {
		httpOnly: true,
		secure: event.url.protocol === 'https:',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});

	return { success: true };
}

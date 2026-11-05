import { form, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { backendError } from '#lib/server/backend-error.js';

const schema = v.object({
	email: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please enter your email address.'),
		v.email('Please enter a valid email address.')
	)
});

export const auth = form(schema, async ({ email }) => {
	const { locals } = getRequestEvent();

	const response = await locals.apiFetch('/auth/login', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ email })
	});

	if (!response.ok) {
		throw new Error(await backendError(response, 'Failed to send magic link.'));
	}

	return response.json();
});

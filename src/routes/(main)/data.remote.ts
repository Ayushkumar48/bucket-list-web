import { form, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import { backendError } from '#lib/server/backend-error.js';

const schema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please enter your name.'),
		v.minLength(2, 'Your name must be at least 2 characters.'),
		v.maxLength(100, 'Your name must be 100 characters or fewer.')
	),
	username: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please choose a username.'),
		v.minLength(3, 'Your username must be at least 3 characters.'),
		v.maxLength(30, 'Your username must be 30 characters or fewer.'),
		v.regex(/^[a-z0-9_]+$/, 'Use only lowercase letters, numbers, and underscores.')
	),
	bio: v.optional(
		v.pipe(v.string(), v.trim(), v.maxLength(500, 'Your bio must be 500 characters or fewer.')),
		''
	)
});

export const onboarding = form(schema, async ({ name, username, bio }) => {
	const { locals } = getRequestEvent();
	const response = await locals.apiFetch('/onboarding', {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ name, username, bio })
	});

	if (!response.ok) {
		throw new Error(await backendError(response, 'Could not save your profile.'));
	}

	redirect(303, '/lists');
});

import { error, redirect } from '@sveltejs/kit';

type User = {
	email: string;
	name?: string;
	username?: string;
	bio?: string;
};

export async function load({ locals, url }) {
	const response = await locals.apiFetch('/me');

	if (response.status === 401) redirect(303, '/auth');
	if (!response.ok) throw error(response.status, 'Could not load your profile.');

	const user = (await response.json()) as User;
	const needsOnboarding = !user.name?.trim() || !user.username?.trim();

	if (needsOnboarding && url.pathname !== '/onboarding') redirect(303, '/onboarding');
	if (!needsOnboarding && url.pathname === '/onboarding') redirect(303, '/lists');

	return { user };
}

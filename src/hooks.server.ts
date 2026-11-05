import type { Handle } from '@sveltejs/kit/hooks';
import { BACKEND_URL } from '$app/env/private';

const DEFAULT_THEME = 'dark';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');

	event.locals.apiFetch = (path, init = {}) => {
		const headers = new Headers(init.headers);

		if (token) headers.set('Authorization', `Bearer ${token}`);

		const url = new URL(path, `${BACKEND_URL.replace(/\/$/, '')}/`);

		return event.fetch(url, {
			...init,
			headers
		});
	};

	const storedTheme = event.cookies.get('theme');
	const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : DEFAULT_THEME;
	const themeClass = theme === 'dark' ? ' class="dark"' : '';
	const themeStyle = ` style="color-scheme: ${theme}"`;

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="en">', `<html lang="en"${themeClass}${themeStyle}>`)
	});
};

import type { Handle } from '@sveltejs/kit/hooks';

const DEFAULT_THEME = 'dark';

export const handle: Handle = async ({ event, resolve }) => {
	const storedTheme = event.cookies.get('theme');
	const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : DEFAULT_THEME;
	const themeClass = theme === 'dark' ? ' class="dark"' : '';
	const themeStyle = ` style="color-scheme: ${theme}"`;

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="en">', `<html lang="en"${themeClass}${themeStyle}>`)
	});
};

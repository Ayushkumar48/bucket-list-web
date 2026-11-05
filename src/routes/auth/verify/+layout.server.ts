import { verifyMagicLink } from '#lib/server/auth.js';

export function load(event) {
	const { url } = event;
	const token = url.searchParams.get('token');

	return {
		token,
		verification: token ? verifyMagicLink(event, token) : null
	};
}

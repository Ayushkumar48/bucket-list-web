export type Theme = 'light' | 'dark';

import { browser } from '$app/env';

export const theme = $state<{ value: Theme }>({
	value: browser && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
});

export function setTheme(next: Theme) {
	theme.value = next;

	document.documentElement.classList.toggle('dark', next === 'dark');
	document.documentElement.style.colorScheme = next;
	document.cookie = `theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

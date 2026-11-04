export type Theme = 'light' | 'dark';

export const theme = $state<{ value: Theme }>({
	value: 'light'
});

export function setTheme(next: Theme) {
	theme.value = next;

	document.documentElement.classList.toggle('dark', next === 'dark');
	document.documentElement.style.colorScheme = next;
	localStorage.setItem('theme', next);
}

export function initializeTheme() {
	const saved = localStorage.getItem('theme');
	setTheme(saved === 'dark' ? 'dark' : 'light');
}

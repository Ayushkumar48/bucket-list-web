<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { initializeTheme } from '#lib/theme.svelte.ts';
	import { onMount } from 'svelte';

	let { children }: LayoutProps = $props();
	onMount(initializeTheme);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen min-w-screen bg-background text-foreground">
	{@render children()}
</div>

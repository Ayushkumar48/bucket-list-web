<script lang="ts">
	import './layout.css';
	import { Toaster } from '#lib/components/ui/toast/index.js';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<div class="min-h-screen min-w-screen bg-background text-foreground">
	{@render children()}
</div>

<script lang="ts">
	import { type MegaMenuGroup, MegaNavbar } from '#lib/components/blocks/mega-navbar/index.js';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { resolve } from '$app/paths';

	const groups: MegaMenuGroup[] = [
		{
			label: 'Product',
			href: '/features',
			items: [
				{ label: 'Features', href: '/features', description: 'Everything the app does' },
				{ label: 'Pricing', href: '/pricing', description: 'Plans and billing' }
			],
			footer: { label: 'Start free', href: '/signup', hint: 'No card needed' }
		}
	];

	const links = [{ label: 'Docs', href: '/docs' }];
	let navbarExpanded = $state(false);
	let { children } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="sticky top-0 z-50 h-16"
	onmouseenter={() => (navbarExpanded = true)}
	onmouseleave={() => (navbarExpanded = false)}
	onfocusin={() => (navbarExpanded = true)}
	onfocusout={(event) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) navbarExpanded = false;
	}}
>
	<div
		class={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
			navbarExpanded ? 'translate-y-0' : '-translate-y-12'
		}`}
	>
		<MegaNavbar
			sticky={false}
			active="/features"
			class="mx-40 w-auto rounded-b-xl bg-muted"
			{groups}
			{links}
		>
			{#snippet brand()}
				<a class="font-semibold text-foreground" href={resolve('/bucket-list')}>Bucket List</a>
			{/snippet}
			{#snippet actions()}
				<Button size="sm">Sign up</Button>
			{/snippet}
		</MegaNavbar>
	</div>
</div>

{@render children()}

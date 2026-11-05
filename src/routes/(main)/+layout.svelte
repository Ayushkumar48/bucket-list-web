<script lang="ts">
	import { MegaNavbar } from '#lib/components/blocks/mega-navbar/index.js';
	import { UserMenu } from '#lib/components/ui/user-menu/index.js';
	import { resolve } from '$app/paths';
	import { ThemeToggle } from '#lib/components/ui/theme-toggle/index.js';
	import { goto } from '$app/navigation';
	import {
		NotificationCenter,
		type NotificationItem
	} from '#lib/components/ui/notification-center/index.js';
	import type { LayoutProps } from './$types';

	// const groups: MegaMenuGroup[] = [
	// 	{
	// 		label: 'Home',
	// 		href: '/bucket',
	// 		items: [
	// 			{ label: 'Features', href: '/features', description: 'Everything the app does' },
	// 			{ label: 'Pricing', href: '/pricing', description: 'Plans and billing' }
	// 		],
	// 		footer: { label: 'Start free', href: '/signup', hint: 'No card needed' }
	// 	}
	// ];

	const links = [
		{ label: 'My Bucket Lists', href: '/lists' },
		{ label: 'Explore', href: '/explore' },
		{ label: 'My Feed', href: '/feed' }
	];
	let pointerInsideNavbar = $state(false);
	let items = $state<NotificationItem[]>([
		{ id: '1', title: 'Deploy finished', time: '2m', tone: 'success' }
	]);
	let navbarFocused = $state(false);
	let userMenuOpen = $state(false);
	let notificationCenterOpen = $state(false);
	let { children, data }: LayoutProps = $props();
	const navbarExpanded = $derived(
		pointerInsideNavbar || navbarFocused || userMenuOpen || notificationCenterOpen
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="sticky top-0 z-50 h-16"
	onpointerenter={() => {
		pointerInsideNavbar = true;
	}}
	onpointerleave={() => {
		pointerInsideNavbar = false;
	}}
	onfocusin={() => {
		navbarFocused = true;
	}}
	onfocusout={(event) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			navbarFocused = false;
		}
	}}
>
	<div
		class={`transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
			navbarExpanded ? 'translate-y-0' : '-translate-y-12'
		}`}
	>
		<MegaNavbar
			sticky={false}
			active="/features"
			class="mx-40 w-auto rounded-b-xl bg-muted"
			{links}
		>
			{#snippet brand()}
				<a class="font-semibold text-foreground" href={resolve('/(main)/lists')}>
					<h1>Bucket List</h1>
				</a>
			{/snippet}
			{#snippet actions()}
				<ThemeToggle variant="circle-blur" class="mr-2" />
				<NotificationCenter bind:notifications={items} bind:open={notificationCenterOpen} />

				<UserMenu
					bind:open={userMenuOpen}
					user={{ name: data.user.name ?? data.user.email, email: data.user.email }}
					items={[
						{
							label: 'Saved',
							onSelect: () => goto(resolve('/(main)/saved'))
						},
						{
							label: 'Settings',
							onSelect: () => goto(resolve('/(main)/settings'))
						}
					]}
					onSignOut={() => fetch('/logout', { method: 'POST' })}
				/>
			{/snippet}
		</MegaNavbar>
	</div>
</div>

{@render children()}
